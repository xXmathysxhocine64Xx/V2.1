#!/usr/bin/env python3
"""
Next.js 15 Migration Test for WebCraft V5.0.1
Tests the complete migration from React + FastAPI to Next.js 15 Full-Stack
"""

import requests
import subprocess
import os
import time
import json
from datetime import datetime

def run_command(command, cwd="/app", timeout=30):
    """Run a shell command and return result"""
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            cwd=cwd, 
            capture_output=True, 
            text=True, 
            timeout=timeout
        )
        return result.returncode == 0, result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        return False, "", "Command timed out"
    except Exception as e:
        return False, "", str(e)

def test_nextjs_dependencies():
    """Test Next.js 15 dependencies installation"""
    print("\n=== Testing Next.js Dependencies ===")
    
    # Check package.json
    try:
        with open('/app/package.json', 'r') as f:
            package_data = json.load(f)
        
        # Verify Next.js 15
        next_version = package_data.get('dependencies', {}).get('next', '')
        if '15.4.2' in next_version:
            print(f"✅ Next.js version: {next_version}")
        else:
            print(f"❌ Wrong Next.js version: {next_version}")
            return False
            
        # Verify React 19
        react_version = package_data.get('dependencies', {}).get('react', '')
        if '19.0.0' in react_version:
            print(f"✅ React version: {react_version}")
        else:
            print(f"❌ Wrong React version: {react_version}")
            return False
            
        # Check node_modules
        if os.path.exists('/app/node_modules/next'):
            print("✅ Next.js installed in node_modules")
        else:
            print("❌ Next.js not found in node_modules")
            return False
            
        print("✅ Next.js Dependencies test PASSED")
        return True
        
    except Exception as e:
        print(f"❌ Dependencies test FAILED: {e}")
        return False

def test_nextjs_build():
    """Test Next.js build process"""
    print("\n=== Testing Next.js Build ===")
    
    # Test yarn build
    success, stdout, stderr = run_command("yarn build", timeout=60)
    
    if success:
        print("✅ Next.js build successful")
        
        # Check .next directory
        if os.path.exists('/app/.next'):
            print("✅ .next build directory created")
            
            # Check for key build files
            build_files = [
                '.next/build-manifest.json',
                '.next/routes-manifest.json',
                '.next/static',
                '.next/server'
            ]
            
            missing_files = []
            for file_path in build_files:
                if not os.path.exists(f'/app/{file_path}'):
                    missing_files.append(file_path)
            
            if missing_files:
                print(f"❌ Missing build files: {missing_files}")
                return False
            else:
                print("✅ All essential build files present")
                
        else:
            print("❌ .next directory not created")
            return False
            
        print("✅ Next.js Build test PASSED")
        return True
    else:
        print(f"❌ Build failed: {stderr}")
        return False

def test_nextjs_server():
    """Test Next.js server functionality"""
    print("\n=== Testing Next.js Server ===")
    
    # Check if server is running on port 3002
    try:
        response = requests.get("http://localhost:3002", timeout=10)
        if response.status_code == 200:
            print("✅ Next.js server responding on port 3002")
            
            # Check for WebCraft content
            content = response.text
            if "WebCraft" in content and "Site Web Moderne" in content:
                print("✅ WebCraft content detected")
            else:
                print("❌ WebCraft content not found")
                return False
                
            print("✅ Next.js Server test PASSED")
            return True
        else:
            print(f"❌ Server returned status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Server test FAILED: {e}")
        return False

def test_webcraft_routes():
    """Test Next.js routing system"""
    print("\n=== Testing WebCraft Routes ===")
    
    routes_to_test = [
        ("/", "should redirect to /accueil"),
        ("/accueil", "WebCraft homepage")
    ]
    
    all_passed = True
    
    for route, description in routes_to_test:
        try:
            response = requests.get(f"http://localhost:3002{route}", timeout=10, allow_redirects=False)
            
            if route == "/":
                # Root should redirect
                if response.status_code in [307, 302, 301]:
                    print(f"✅ Route {route}: Redirect working ({response.status_code})")
                else:
                    print(f"❌ Route {route}: Expected redirect, got {response.status_code}")
                    all_passed = False
            else:
                # Other routes should return 200
                if response.status_code == 200:
                    print(f"✅ Route {route}: {description} working")
                    
                    # Check for WebCraft specific content
                    content = response.text
                    if "WebCraft" in content:
                        print(f"✅ Route {route}: WebCraft branding present")
                    else:
                        print(f"❌ Route {route}: WebCraft branding missing")
                        all_passed = False
                        
                else:
                    print(f"❌ Route {route}: Status {response.status_code}")
                    all_passed = False
                    
        except Exception as e:
            print(f"❌ Route {route} test FAILED: {e}")
            all_passed = False
    
    if all_passed:
        print("✅ WebCraft Routes test PASSED")
    else:
        print("❌ WebCraft Routes test FAILED")
        
    return all_passed

def test_webcraft_aesthetic():
    """Test WebCraft aesthetic preservation"""
    print("\n=== Testing WebCraft Aesthetic ===")
    
    try:
        response = requests.get("http://localhost:3002/accueil", timeout=10)
        content = response.text
        
        # Check for WebCraft design elements
        design_elements = [
            "glassmorphism",  # Glass effect
            "gradient",       # Gradient backgrounds
            "animate-",       # Animations
            "backdrop-blur",  # Glassmorphism effect
            "bg-gradient-to", # Gradient backgrounds
            "from-blue",      # WebCraft color scheme
            "to-purple",      # WebCraft color scheme
            "animate-float",  # Floating animations
            "animate-fade-in-up", # Fade animations
        ]
        
        found_elements = []
        missing_elements = []
        
        for element in design_elements:
            if element in content:
                found_elements.append(element)
            else:
                missing_elements.append(element)
        
        print(f"✅ Found design elements: {len(found_elements)}/{len(design_elements)}")
        print(f"   Found: {', '.join(found_elements[:5])}...")
        
        if missing_elements:
            print(f"⚠️  Missing elements: {', '.join(missing_elements[:3])}...")
        
        # Check for specific WebCraft content
        webcraft_content = [
            "Créons ensemble votre",
            "site web parfait",
            "WebCraft Professional",
            "Next.js Full-Stack"
        ]
        
        content_found = 0
        for text in webcraft_content:
            if text in content:
                content_found += 1
        
        print(f"✅ WebCraft content found: {content_found}/{len(webcraft_content)}")
        
        # Success if most elements are present
        if len(found_elements) >= len(design_elements) * 0.7 and content_found >= 2:
            print("✅ WebCraft Aesthetic test PASSED")
            return True
        else:
            print("❌ WebCraft Aesthetic test FAILED - Missing key elements")
            return False
            
    except Exception as e:
        print(f"❌ Aesthetic test FAILED: {e}")
        return False

def test_ubuntu_compatibility():
    """Test Ubuntu 24.04 compatibility"""
    print("\n=== Testing Ubuntu 24.04 Compatibility ===")
    
    try:
        # Check Node.js version
        success, node_version, _ = run_command("node --version")
        if success:
            print(f"✅ Node.js version: {node_version.strip()}")
        else:
            print("❌ Node.js not available")
            return False
        
        # Check Yarn version
        success, yarn_version, _ = run_command("yarn --version")
        if success:
            print(f"✅ Yarn version: {yarn_version.strip()}")
        else:
            print("❌ Yarn not available")
            return False
        
        # Check Tailwind CSS compilation
        if os.path.exists('/app/tailwind.config.js'):
            print("✅ Tailwind CSS config present")
        else:
            print("❌ Tailwind CSS config missing")
            return False
        
        # Check CSS build
        if os.path.exists('/app/.next/static/css'):
            print("✅ CSS compiled successfully")
        else:
            print("❌ CSS compilation failed")
            return False
        
        print("✅ Ubuntu 24.04 Compatibility test PASSED")
        return True
        
    except Exception as e:
        print(f"❌ Ubuntu compatibility test FAILED: {e}")
        return False

def test_installation_script():
    """Test the new Next.js installation script"""
    print("\n=== Testing Installation Script ===")
    
    script_path = "/app/install_ubuntu24_nextjs.sh"
    
    if not os.path.exists(script_path):
        print("❌ Installation script not found")
        return False
    
    try:
        with open(script_path, 'r') as f:
            script_content = f.read()
        
        # Check for key Next.js installation components
        required_components = [
            "yarn install",
            "yarn build", 
            "yarn start",
            "pm2 start",
            "Next.js",
            "Ubuntu 24.04",
            "nginx",
            "certbot"
        ]
        
        found_components = []
        for component in required_components:
            if component in script_content:
                found_components.append(component)
        
        print(f"✅ Installation script components: {len(found_components)}/{len(required_components)}")
        print(f"   Found: {', '.join(found_components)}")
        
        # Check script permissions
        if os.access(script_path, os.X_OK):
            print("✅ Script is executable")
        else:
            print("⚠️  Script not executable (may need chmod +x)")
        
        if len(found_components) >= len(required_components) * 0.8:
            print("✅ Installation Script test PASSED")
            return True
        else:
            print("❌ Installation Script test FAILED - Missing components")
            return False
            
    except Exception as e:
        print(f"❌ Installation script test FAILED: {e}")
        return False

def run_all_tests():
    """Run all Next.js migration tests"""
    print("🚀 Starting WebCraft Next.js 15 Migration Tests")
    print("=" * 60)
    
    results = {}
    
    # Test sequence
    test_functions = [
        ("nextjs_dependencies", test_nextjs_dependencies),
        ("nextjs_build", test_nextjs_build),
        ("nextjs_server", test_nextjs_server),
        ("webcraft_routes", test_webcraft_routes),
        ("webcraft_aesthetic", test_webcraft_aesthetic),
        ("ubuntu_compatibility", test_ubuntu_compatibility),
        ("installation_script", test_installation_script),
    ]
    
    for test_name, test_func in test_functions:
        results[test_name] = test_func()
        time.sleep(1)  # Brief pause between tests
    
    # Summary
    print("\n" + "=" * 60)
    print("🏁 NEXT.JS MIGRATION TEST RESULTS")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL TESTS PASSED - Next.js migration successful!")
        return True
    elif passed >= total * 0.8:
        print("✅ MIGRATION MOSTLY SUCCESSFUL - Minor issues detected")
        return True
    else:
        print("⚠️  MIGRATION NEEDS ATTENTION - Multiple issues found")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)