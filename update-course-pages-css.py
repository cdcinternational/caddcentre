"""
Auto-Update Course Pages with Premium CSS
==========================================

This script automatically adds the premium-courses.css file
to all 15 course pages in the CADD Centre project.
"""

import os
import re

# List of course page files
course_files = [
    "Ai-building design.html",
    "Excutive diploma in ad.html",
    "Executive D in BIM.html",
    "ExecutiveD_ID.html",
    "ExecutiveDinSD.html",
    "MCinAD.html",
    "MCinBD.html",
    "MasterCertificateinMEPDesign.html",
    "experinAD.html",
    "expertid.html",
    "expertinbd.html",
    "expertinbim.html",
    "mastercid.html",
    "mastercinbim.html"
]

# CSS link to add
css_link = '    <link href="css/premium-courses.css" rel="stylesheet" />\n'

# Base directory
base_dir = os.path.dirname(os.path.abspath(__file__))

def add_css_to_file(filename):
    """Add premium CSS link to a course page if not already present"""
    filepath = os.path.join(base_dir, filename)
    
    if not os.path.exists(filepath):
        print(f"❌ File not found: {filename}")
        return False
    
    try:
        # Read the file
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if CSS is already added
        if 'premium-courses.css' in content:
            print(f"✅ Already updated: {filename}")
            return True
        
        # Find the position to insert (after style.css or before </head>)
        if 'css/style.css' in content:
            # Insert after style.css
            content = content.replace(
                '<link href="css/style.css" rel="stylesheet" />',
                '<link href="css/style.css" rel="stylesheet" />\n' + css_link
            )
        elif '</head>' in content:
            # Insert before </head>
            content = content.replace('</head>', css_link + '  </head>')
        else:
            print(f"⚠️  Could not find insertion point in: {filename}")
            return False
        
        # Write the updated content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Updated: {filename}")
        return True
        
    except Exception as e:
        print(f"❌ Error updating {filename}: {str(e)}")
        return False

def main():
    """Main function to update all course pages"""
    print("=" * 60)
    print("🎨 CADD Centre - Course Pages CSS Updater")
    print("=" * 60)
    print(f"\n📁 Working directory: {base_dir}\n")
    print(f"📝 Updating {len(course_files)} course pages...\n")
    
    updated = 0
    already_updated = 0
    failed = 0
    
    for filename in course_files:
        result = add_css_to_file(filename)
        if result:
            if 'Already updated' in str(result):
                already_updated += 1
            else:
                updated += 1
        else:
            failed += 1
    
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"✅ Newly updated: {updated}")
    print(f"✓  Already updated: {already_updated}")
    print(f"❌ Failed: {failed}")
    print(f"📝 Total processed: {len(course_files)}")
    print("=" * 60)
    
    if updated > 0 or already_updated > 0:
        print("\n🎉 Success! Your course pages now have premium designs!")
        print("\n📋 Next steps:")
        print("   1. Refresh your browser (Ctrl + F5)")
        print("   2. Visit any course page")
        print("   3. Enjoy the stunning new design!")
    
    return updated, already_updated, failed

if __name__ == "__main__":
    main()
