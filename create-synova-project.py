# SYNOVA AI - COMPLETE SETUP SCRIPT
# This script creates your entire Synova AI project structure

import os

def create_synova_project():
    """Create the complete Synova AI project structure"""
    
    print("🚀 Creating Synova AI Project... - create-synova-project.py:11")
    print("= - create-synova-project.py:12" * 50)
    
    # Create main project directory
    project_name = "synova-ai-platform"
    if not os.path.exists(project_name):
        os.makedirs(project_name)
        print(f"✅ Created main folder: {project_name} - create-synova-project.py:18")
    
    # Define the complete project structure
    folders = [
        "backend",
        "backend/api",
        "backend/ai_core",
        "frontend/terrestrial",
        "frontend/aerial", 
        "frontend/celestial",
        "mobile",
        "docs",
        "config",
        "tests"
    ]
    
    # Create all folders
    for folder in folders:
        full_path = os.path.join(project_name, folder)
        if not os.path.exists(full_path):
            os.makedirs(full_path)
            print(f"✅ Created folder: {folder} - create-synova-project.py:39")
    
    print("\n🎉 Project structure created successfully! - create-synova-project.py:41")
    print(f"📁 Your project is in the '{project_name}' folder - create-synova-project.py:42")
    print("Next: Run the main setup to install everything! - create-synova-project.py:43")

if __name__ == "__main__":
    create_synova_project()
# SYNOVA AI - COMPLETE SETUP SCRIPT
# This script creates your entire Synova AI project structure  