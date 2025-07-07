#!/usr/bin/env python3
"""
HTML Renderer with CloudScraper
Fetches HTML from websites and displays them as rendered webpages with full functionality.
Uses PyQt5/PyQt6 with QWebEngineView for proper HTML rendering.
"""

import sys
import time
import requests
import cloudscraper
from urllib.parse import urlparse, urljoin
import tempfile
import os
import webbrowser

# Try to import PyQt (preferred for best rendering)
WEB_ENGINE_AVAILABLE = False
try:
    from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget, QPushButton, QLineEdit, QLabel, QTextEdit, QHBoxLayout, QMessageBox
    from PyQt5.QtWebEngineWidgets import QWebEngineView
    from PyQt5.QtCore import QUrl, Qt
    WEB_ENGINE_AVAILABLE = True
    PYQT_VERSION = 5
except ImportError:
    try:
        from PyQt6.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget, QPushButton, QLineEdit, QLabel, QTextEdit, QHBoxLayout, QMessageBox
        from PyQt6.QtWebEngineWidgets import QWebEngineView
        from PyQt6.QtCore import QUrl, Qt
        WEB_ENGINE_AVAILABLE = True
        PYQT_VERSION = 6
    except ImportError:
        print("PyQt5/PyQt6 with WebEngine not available. Falling back to browser mode.")

def add_protocol_if_missing(url):
    """Add https:// protocol if missing from URL."""
    if not url.startswith(('http://', 'https://')):
        return 'https://' + url
    return url

def is_valid_url(url):
    """Validate if the provided URL is properly formatted."""
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except Exception:
        return False

def fetch_with_requests(url, timeout=10):
    """Fetch HTML content using the requests library."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        return True, response.text, response.status_code, ""
    except Exception as e:
        return False, "", 0, str(e)

def fetch_with_cloudscraper(url, timeout=10):
    """Fetch HTML content using the cloudscraper library."""
    try:
        scraper = cloudscraper.create_scraper(
            browser={
                'browser': 'chrome',
                'platform': 'windows',
                'mobile': False
            }
        )
        response = scraper.get(url, timeout=timeout)
        response.raise_for_status()
        return True, response.text, response.status_code, ""
    except Exception as e:
        return False, "", 0, str(e)

def fix_relative_urls(html_content, base_url):
    """Fix relative URLs in HTML content to make them absolute."""
    import re
    
    # Fix relative URLs in src attributes
    html_content = re.sub(
        r'src=["\'](?!https?://|//|data:)([^"\']+)["\']',
        lambda m: f'src="{urljoin(base_url, m.group(1))}"',
        html_content
    )
    
    # Fix relative URLs in href attributes
    html_content = re.sub(
        r'href=["\'](?!https?://|//|mailto:|tel:|#)([^"\']+)["\']',
        lambda m: f'href="{urljoin(base_url, m.group(1))}"',
        html_content
    )
    
    # Fix relative URLs in action attributes
    html_content = re.sub(
        r'action=["\'](?!https?://|//)([^"\']+)["\']',
        lambda m: f'action="{urljoin(base_url, m.group(1))}"',
        html_content
    )
    
    return html_content

class WebRenderer(QMainWindow):
    """Main window class for the web renderer application."""
    
    def __init__(self):
        super().__init__()
        self.initUI()
        
    def initUI(self):
        """Initialize the user interface."""
        self.setWindowTitle('HTML Renderer with CloudScraper')
        self.setGeometry(100, 100, 1200, 800)
        
        # Central widget
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        # Layout
        layout = QVBoxLayout()
        
        # URL input section
        url_layout = QHBoxLayout()
        
        self.url_label = QLabel('Enter URL:')
        self.url_input = QLineEdit()
        self.url_input.setPlaceholderText('https://example.com')
        self.url_input.returnPressed.connect(self.fetch_and_render)
        
        self.fetch_btn = QPushButton('Fetch & Render')
        self.fetch_btn.clicked.connect(self.fetch_and_render)
        
        self.method_label = QLabel('Method: Auto (tries both)')
        
        url_layout.addWidget(self.url_label)
        url_layout.addWidget(self.url_input)
        url_layout.addWidget(self.fetch_btn)
        
        # Status label
        self.status_label = QLabel('Ready to fetch HTML content...')
        
        # Web view
        self.web_view = QWebEngineView()
        
        # Add to layout
        layout.addLayout(url_layout)
        layout.addWidget(self.method_label)
        layout.addWidget(self.status_label)
        layout.addWidget(self.web_view)
        
        central_widget.setLayout(layout)
        
        # Load initial page
        initial_html = """
        <html>
        <head>
            <title>HTML Renderer</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 50px; 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                .container {
                    background: rgba(255,255,255,0.1);
                    padding: 30px;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                }
                h1 { color: #fff; margin-bottom: 20px; }
                p { font-size: 18px; line-height: 1.6; }
                .features {
                    text-align: left;
                    margin: 20px 0;
                }
                .feature {
                    margin: 10px 0;
                    padding: 10px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🌐 HTML Renderer with CloudScraper</h1>
                <p>Enter a website URL above to fetch and render it with full functionality!</p>
                
                <div class="features">
                    <div class="feature">✅ Uses requests and cloudscraper for fetching</div>
                    <div class="feature">✅ Renders HTML with full CSS and JavaScript</div>
                    <div class="feature">✅ Supports interactive elements and forms</div>
                    <div class="feature">✅ Handles images, videos, and media</div>
                    <div class="feature">✅ Works with single-page applications</div>
                </div>
                
                <p><strong>Try websites like:</strong><br>
                example.com, github.com, stackoverflow.com</p>
            </div>
        </body>
        </html>
        """
        self.web_view.setHtml(initial_html)
    
    def fetch_and_render(self):
        """Fetch HTML content and render it in the web view."""
        url = self.url_input.text().strip()
        
        if not url:
            QMessageBox.warning(self, 'Warning', 'Please enter a URL')
            return
        
        # Add protocol if missing
        url = add_protocol_if_missing(url)
        
        # Validate URL
        if not is_valid_url(url):
            QMessageBox.warning(self, 'Warning', 'Invalid URL format')
            return
        
        self.status_label.setText('Fetching content...')
        self.fetch_btn.setEnabled(False)
        
        # Try to fetch with both methods
        success = False
        html_content = ""
        method_used = ""
        
        # Try requests first
        self.status_label.setText('Trying with requests...')
        QApplication.processEvents()  # Update UI
        
        success, html_content, status_code, error = fetch_with_requests(url)
        
        if success:
            method_used = "requests"
            self.status_label.setText(f'Success with requests! Status: {status_code}')
        else:
            # Try cloudscraper
            self.status_label.setText('Trying with cloudscraper...')
            QApplication.processEvents()  # Update UI
            
            success, html_content, status_code, error = fetch_with_cloudscraper(url)
            
            if success:
                method_used = "cloudscraper"
                self.status_label.setText(f'Success with cloudscraper! Status: {status_code}')
            else:
                self.status_label.setText(f'Both methods failed: {error}')
                QMessageBox.critical(self, 'Error', f'Failed to fetch content:\n{error}')
                self.fetch_btn.setEnabled(True)
                return
        
        # Fix relative URLs to make the page work properly
        html_content = fix_relative_urls(html_content, url)
        
        # Update method label
        self.method_label.setText(f'Method: {method_used} | Length: {len(html_content):,} chars')
        
        # Render the HTML
        self.web_view.setHtml(html_content, QUrl(url))
        
        self.status_label.setText(f'Rendered successfully using {method_used}')
        self.fetch_btn.setEnabled(True)

def create_browser_fallback():
    """Fallback function that opens HTML in default browser."""
    print("=" * 60)
    print("HTML RENDERER (Browser Mode)")
    print("=" * 60)
    print("PyQt not available. Will open HTML in your default browser.")
    print("=" * 60)
    
    while True:
        try:
            url = input("\nEnter website URL (or 'quit' to exit): ").strip()
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
            
        if url.lower() in ['quit', 'exit', 'q']:
            print("Goodbye!")
            break
        
        if not url:
            print("Please enter a valid URL.")
            continue
        
        url = add_protocol_if_missing(url)
        
        if not is_valid_url(url):
            print("Invalid URL format.")
            continue
        
        print(f"\nFetching from: {url}")
        
        # Try both methods
        success = False
        html_content = ""
        
        print("Trying with requests...")
        success, html_content, status_code, error = fetch_with_requests(url)
        
        if success:
            print(f"✅ Success with requests! Status: {status_code}")
        else:
            print(f"❌ Failed with requests: {error}")
            print("Trying with cloudscraper...")
            
            success, html_content, status_code, error = fetch_with_cloudscraper(url)
            
            if success:
                print(f"✅ Success with cloudscraper! Status: {status_code}")
            else:
                print(f"❌ Both methods failed: {error}")
                continue
        
        # Fix relative URLs
        html_content = fix_relative_urls(html_content, url)
        
        # Save to temporary file and open in browser
        with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
            f.write(html_content)
            temp_file = f.name
        
        print(f"📄 Content length: {len(html_content):,} characters")
        print(f"🌐 Opening in browser: {temp_file}")
        
        # Open in default browser
        webbrowser.open('file://' + temp_file)
        
        input("Press Enter to continue (file will be cleaned up)...")
        
        # Clean up
        try:
            os.unlink(temp_file)
        except:
            pass

def main():
    """Main function to run the HTML renderer."""
    if WEB_ENGINE_AVAILABLE:
        # Run PyQt application
        app = QApplication(sys.argv)
        window = WebRenderer()
        window.show()
        sys.exit(app.exec_() if PYQT_VERSION == 5 else app.exec())
    else:
        # Run browser fallback
        create_browser_fallback()

if __name__ == "__main__":
    # Check dependencies
    try:
        import requests
        import cloudscraper
    except ImportError as e:
        print("❌ Missing required libraries!")
        print("Install them with: pip install requests cloudscraper")
        if not WEB_ENGINE_AVAILABLE:
            print("For GUI mode, also install: pip install PyQt5 PyQtWebEngine")
            print("Or: pip install PyQt6 PyQt6-WebEngine")
        sys.exit(1)
    
    main()
