import os
import re

# List of course pages to update
course_pages = [
    "Excutive diploma in ad.html",
    "Executive D in BIM.html",
    "ExecutiveD_ID.html",
    "ExecutiveDinSD.html",
    "MasterCertificateinMEPDesign.html",
    "MCinAD.html",
    "MCinBD.html",
    "Ai-building design.html"
]

# Function to update a single file
def update_file(file_path):
    try:
        # Read the file content
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Remove WhatsApp button from footer
        # Pattern to match the WhatsApp button in the social media links
        whatsapp_pattern = r'<a\s+class="btn btn-square btn-outline-light me-2"\s+href="https://wa\.me/[^"]*"[^>]*>.*?<i class="fab fa-whatsapp"></i\s*[^>]*>\s*</a>\s*'
        content = re.sub(whatsapp_pattern, '', content, flags=re.DOTALL)
        
        # Add AI chatbot script before </body> tag
        # First remove any existing AI chatbot script
        content = re.sub(r'<!-- AI Chatbot -->.*?<!-- AI Chatbot -->', '', content, flags=re.DOTALL)
        content = re.sub(r'<script src="js/ai-chatbot\.js"></script>', '', content)
        
        # Add the AI chatbot script before </body>
        body_end_pattern = r'(</body>)'
        replacement = r'    <!-- AI Chatbot -->\n    <script src="js/ai-chatbot.js"></script>\n    <!-- AI Chatbot -->\n\1'
        content = re.sub(body_end_pattern, replacement, content, count=1)
        
        # Write the updated content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"Successfully updated {file_path}")
        return True
    except Exception as e:
        print(f"Error updating {file_path}: {str(e)}")
        return False

# Update all course pages
def main():
    base_path = r"c:\Users\ashik\Desktop\cddd\Cadd-centre"
    success_count = 0
    
    for page in course_pages:
        file_path = os.path.join(base_path, page)
        if os.path.exists(file_path):
            if update_file(file_path):
                success_count += 1
        else:
            print(f"File not found: {file_path}")
    
    print(f"\nUpdated {success_count} out of {len(course_pages)} course pages")

if __name__ == "__main__":
    main()