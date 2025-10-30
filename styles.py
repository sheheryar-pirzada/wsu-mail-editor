# styles.py - Email-safe inline styles for WSU newsletters
"""
Note: Focus on universal email client support (no dark-mode CSS for compatibility)
"""

# Brand Colors
CRIMSON = "#A60F2D"
DARK_CRIMSON = "#8c0d25"
TEXT_DARK = "#2A3033"
TEXT_BODY = "#333333"
TEXT_MUTED = "#5E6A71"
BG_LIGHT = "#f4f4f4"
BG_CARD = "#f9f9f9"
BG_WHITE = "#ffffff"
BORDER_LIGHT = "#e0e0e0"
BORDER_MEDIUM = "#d9d9d9"


# Common inline style strings
STYLE_RESET = "margin:0; padding:0; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;"

STYLE_TABLE = "border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"

STYLE_IMAGE = "-ms-interpolation-mode:bicubic; border:0; outline:none; text-decoration:none; height:auto; line-height:100%; display:block;"

STYLE_LINK = f"color:{CRIMSON}; text-decoration:underline; font-weight:bold;"

STYLE_H2 = f"margin:0 0 20px 0; padding:0; font-weight:bold; font-size:22px; line-height:1.3; color:{CRIMSON};"

STYLE_H3 = f"margin:0 0 10px 0; padding:0; font-weight:bold; font-size:18px; line-height:1.3; color:{TEXT_DARK};"

STYLE_BODY_TEXT = f"font-size:16px; line-height:1.6; color:{TEXT_BODY}; margin:0 0 12px 0;"

STYLE_META = f"font-size:15px; color:{TEXT_MUTED}; margin:10px 0; line-height:1.7;"

STYLE_LOCATION_LABEL = f"margin:0 0 5px 0; color:{CRIMSON}; font-weight:bold; font-size:14px;"

STYLE_CARD_ACCENT = f"width:4px; background-color:{CRIMSON};"

STYLE_CARD_BODY = "padding:20px;"

STYLE_FOOTER_TEXT = "color:#cccccc; font-size:14px; line-height:1.6; margin:0;"

STYLE_SOCIAL_ICON_CELL = "padding:0 8px;"

# Full email wrapper styles
EMAIL_CSS = f"""
html, body {{ 
  margin: 0 !important; 
  padding: 0 !important; 
  height: 100% !important; 
  width: 100% !important; 
}}
* {{ 
  -ms-text-size-adjust: 100%; 
  -webkit-text-size-adjust: 100%; 
}}
table, td {{ 
  mso-table-lspace: 0pt; 
  mso-table-rspace: 0pt; 
  border-collapse: collapse; 
}}
img {{ 
  -ms-interpolation-mode: bicubic; 
  border: 0; 
  outline: none; 
  text-decoration: none; 
  height: auto; 
  line-height: 100%; 
  display: block; 
}}
a:not([data-role="footer-link"]):not([data-role="cta"]) {{ 
  color: {CRIMSON} !important;
  text-decoration: underline; 
}}
a[x-apple-data-detectors], 
.x-apple-data-detectors a {{ 
  color: inherit !important; 
  text-decoration: inherit !important; 
}}
div[style*="margin: 16px 0"] {{ 
  margin: 0 !important; 
}}
body, table, td {{ 
  font-family: Arial, Helvetica, sans-serif; 
}}
@media screen and (max-width: 600px) {{
  .container {{ 
    width: 100% !important; 
  }}
  .content {{ 
    padding: 18px 15px 24px !important; 
  }}
  h2 {{ 
    font-size: 20px !important; 
  }}
  h3 {{ 
    font-size: 17px !important; 
  }}
  p, li {{
    font-size: 15px !important; 
  }}
}}
"""
