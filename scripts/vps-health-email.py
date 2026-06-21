#!/usr/bin/env python3
"""
VPS Health Check + Email Report via Resend API
Runs on the VPS itself via cron. No SSH, no SMTP needed.
"""

import json
import subprocess
import urllib.request
from datetime import datetime, timezone

# ── Config ─
HEALTH_SCRIPT = "/usr/local/bin/vps-health-check.sh"
EMAIL_TO = "sales@cnurbaneco.com"
SERVER_IP = "178.104.6.190"
RESEND_API_KEY = "re_M17cTpg2_LLuinEtrpxQm6KtGw3hAZs3b"
RESEND_FROM = "VPS 体检机器人 <noreply@cnurbaneco.com>"


def run_health_check():
    result = subprocess.run(
        [HEALTH_SCRIPT],
        capture_output=True, text=True, timeout=30,
    )
    if result.returncode != 0:
        raise RuntimeError("Health check failed: " + result.stderr)
    return json.loads(result.stdout)


def is_ok(status, ok_values=("active", "200")):
    return status in ok_values


def status_html(status):
    color = "#1a7f4f" if is_ok(status) else "#d85a30"
    text = "正常" if is_ok(status) else f"异常 ({status})"
    return f'<span style="color:{color};font-weight:600;">{text}</span>'


def build_email(data):
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    now_date = datetime.now().strftime("%Y-%m-%d")

    ssl_legacy = data.get("ssl_legacy_days", 0)
    ssl_staging = data.get("ssl_staging_days", 0)
    errors = data.get("app_errors_24h", 0)

    def row(k, v):
        return (
            f'<tr><td style="padding:12px 20px;border-bottom:1px solid #ececec;'
            f"color:#666;width:160px;\">{k}</td>"
            f'<td style="padding:12px 20px;border-bottom:1px solid #ececec;'
            f'font-weight:500;">{v}</td></tr>'
        )

    warn_html = ""
    if errors > 100:
        warn_html = (
            '<tr><td colspan="2" style="padding:12px 20px;'
            "background:#fff8f0;color:#791f1f;font-size:15px;"
            'border-top:1px solid #f0d6c0;">'
            f"⚠ 过去 24 小时内有 {errors} 条 Error 记录，建议关注。"
            "</td></tr>"
        )

    html = (
        "<!DOCTYPE html>\n<html><head><meta charset=\"utf-8\">\n"
        '<style>\n'
        "body{margin:0;padding:0;background:#f0f0f0;font-family:"
        "-apple-system,Helvetica,Arial,sans-serif;}\n"
        ".wrap{max-width:640px;margin:0 auto;background:#fff;}\n"
        ".header{background:#2c3e50;color:#fff;padding:20px 28px;}\n"
        ".header h1{margin:0;font-size:20px;font-weight:600;}\n"
        ".header .meta{margin:8px 0 0;font-size:14px;"
        "color:rgba(255,255,255,.6);}\n"
        ".section{padding:10px 20px;font-size:13px;color:#999;"
        "font-weight:600;letter-spacing:.5px;background:#f8f8f8;"
        "border-bottom:1px solid #ececec;}\n"
        "table.metrics{width:100%;border-collapse:collapse;font-size:15px;}\n"
        ".footer{padding:16px 20px;text-align:center;font-size:12px;"
        "color:#bbb;}\n"
        "</style>\n</head><body>\n"
        '<div class="wrap">\n'
        '<div class="header">\n'
        '<h1>德国 VPS 健康体检报告</h1>\n'
        f'<p class="meta">{now}&nbsp; |&nbsp; {SERVER_IP}</p>\n'
        "</div>\n"
        '<div class="section">系统状态</div>\n'
        '<table class="metrics">\n'
        + row('运行时间', data.get('uptime', 'N/A'))
        + "\n"
        + row('CPU 负载', data.get('load', 'N/A'))
        + "\n"
        + row(
            '内存使用',
            f"{data.get('mem_used','')} / {data.get('mem_total','')}",
        )
        + "\n"
        + row(
            '磁盘使用',
            f"{data.get('disk_use','')}（剩余 {data.get('disk_avail','')}）",
        )
        + "\n"
        + row('失败服务', f"{data.get('failed_services', 0)} 个")
        + "\n"
        "</table>\n"
        '<div class="section">服务状态</div>\n'
        '<table class="metrics">\n'
        + row('Nginx', status_html(data.get('nginx', '')))
        + "\n"
        + row('Staging App', status_html(data.get('app', '')))
        + "\n"
        + row('PostgreSQL', status_html(data.get('postgres', '')))
        + "\n"
        "</table>\n"
        '<div class="section">站点访问</div>\n'
        '<table class="metrics">\n'
        + row('cnurbaneco.com', str(data.get('http_cn', '')))
        + "\n"
        + row('staging.cnurbaneco.com', str(data.get('http_staging', '')))
        + "\n"
        + row('legacy.cnurbaneco.com', str(data.get('http_legacy', '')))
        + "\n"
        "</table>\n"
        '<div class="section">SSL 证书</div>\n'
        '<table class="metrics>\n'
        + row(
            'legacy.cnurbaneco.com',
            f'<span style="color:{"#d85a30" if ssl_legacy < 30 else "#1a7f4f"};'
            f"font-weight:600;\">剩余 {ssl_legacy} 天</span>",
        )
        + "\n"
        + row(
            'staging.cnurbaneco.com',
            f'<span style="color:{"#d85a30" if ssl_staging < 30 else "#1a7f4f"};'
            f"font-weight:600;\">剩余 {ssl_staging} 天</span>",
        )
        + "\n"
        "</table>\n"
        + f'{warn_html}\n'
        '<div class="footer">'
        "本报告由 VPS 本机定时任务自动生成，每两天执行一次。</div>\n"
        "</div>\n"
        "</body></html>"
    )

    return html, now_date


def send_via_resend(html_body, date_str):
    subject = f"德国VPS 健康体检报告 — {date_str}"
    payload = json.dumps({
        "from": RESEND_FROM,
        "to": [EMAIL_TO],
        "subject": subject,
        "html": html_body,
    }).encode()

    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "vps-health-check/1.0",
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=15) as resp:
        result = json.loads(resp.read())
        print(f"Email sent! ID: {result.get('id', 'unknown')}")


def main():
    print("Running VPS health check (local)...")
    data = run_health_check()
    print(f"Uptime: {data.get('uptime')}")

    print("Building email...")
    html, date_str = build_email(data)

    print("Sending via Resend API...")
    send_via_resend(html, date_str)

    print("Done.")


if __name__ == "__main__":
    main()
