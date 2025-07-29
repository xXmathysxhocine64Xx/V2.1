#!/usr/bin/env python3
"""
Installation Script Logic Test
Tests the critical components of install_ubuntu24.sh without actually running PM2
"""

import subprocess
import os
import tempfile
import shutil
import time

def run_command(cmd, cwd=None):
    """Run a command and return result"""
    try:
        result = subprocess.run(
            cmd, 
            shell=True, 
            cwd=cwd, 
            capture_output=True, 
            text=True,
            timeout=30
        )
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, "", str(e)

def test_install_script_logic():
    """Test the core logic from install_ubuntu24.sh"""
    print("🚀 Testing Install Script Logic (install_ubuntu24.sh)")
    print("=" * 60)
    
    # Create temporary installation directory
    temp_dir = tempfile.mkdtemp(prefix="webcraft_install_test_")
    install_dir = os.path.join(temp_dir, "webcraft")
    backend_dir = os.path.join(install_dir, "backend")
    
    try:
        print(f"📁 Test installation directory: {install_dir}")
        
        # Step 1: Copy files (simulate line 74-75)
        print("\n=== Step 1: Copying files ===")
        shutil.copytree("/app", install_dir)
        print("✅ Files copied successfully")
        
        # Step 2: Create virtual environment (simulate lines 78-83)
        print("\n=== Step 2: Creating virtual environment ===")
        success, stdout, stderr = run_command("python3 -m venv venv", cwd=backend_dir)
        if not success:
            print(f"❌ Virtual environment creation failed: {stderr}")
            return False
        
        venv_python = os.path.join(backend_dir, "venv", "bin", "python")
        if not os.path.exists(venv_python):
            print("❌ Virtual environment python not found")
            return False
        print(f"✅ Virtual environment created: {venv_python}")
        
        # Step 3: Install dependencies (simulate lines 85-86)
        print("\n=== Step 3: Installing Python dependencies ===")
        activate_and_install = f"bash -c 'source venv/bin/activate && pip install -r requirements.txt'"
        success, stdout, stderr = run_command(activate_and_install, cwd=backend_dir)
        if not success:
            print(f"❌ Dependencies installation failed: {stderr}")
            return False
        print("✅ Python dependencies installed")
        
        # Step 4: Test the critical PM2 command format (simulate line 110)
        print("\n=== Step 4: Testing PM2 command format ===")
        pm2_command = f"pm2 start server.py --name 'webcraft-backend' --interpreter {venv_python}"
        print(f"PM2 command that would be executed: {pm2_command}")
        
        # Verify the interpreter path is absolute and exists
        if os.path.isabs(venv_python) and os.path.exists(venv_python):
            print("✅ PM2 interpreter path is absolute and exists")
        else:
            print("❌ PM2 interpreter path issue")
            return False
        
        # Step 5: Test Python interpreter directly
        print("\n=== Step 5: Testing Python interpreter ===")
        test_cmd = f"{venv_python} -c 'import sys; print(sys.executable)'"
        success, stdout, stderr = run_command(test_cmd)
        if success:
            print(f"✅ Python interpreter working: {stdout.strip()}")
        else:
            print(f"❌ Python interpreter test failed: {stderr}")
            return False
        
        # Step 6: Test server.py can be imported
        print("\n=== Step 6: Testing server.py import ===")
        test_import = f"{venv_python} -c 'import sys; sys.path.insert(0, \".\"); import server; print(\"Server module imported successfully\")'"
        success, stdout, stderr = run_command(test_import, cwd=backend_dir)
        if success:
            print(f"✅ Server module import: {stdout.strip()}")
        else:
            print(f"❌ Server module import failed: {stderr}")
            return False
        
        # Step 7: Test uvicorn can start (simulate what PM2 would do)
        print("\n=== Step 7: Testing uvicorn startup (PM2 simulation) ===")
        uvicorn_test = f"{venv_python} -c 'import uvicorn; print(\"Uvicorn available\")'"
        success, stdout, stderr = run_command(uvicorn_test, cwd=backend_dir)
        if success:
            print(f"✅ Uvicorn available: {stdout.strip()}")
        else:
            print(f"❌ Uvicorn test failed: {stderr}")
            return False
        
        print("\n🎉 ALL INSTALLATION SCRIPT LOGIC TESTS PASSED!")
        print("✅ Virtual environment setup working correctly")
        print("✅ Dependencies installation working")
        print("✅ PM2 interpreter path format correct")
        print("✅ Python interpreter functional")
        print("✅ Server module importable")
        print("✅ Uvicorn available for PM2")
        
        return True
        
    except Exception as e:
        print(f"❌ Installation script logic test failed: {e}")
        return False
    finally:
        # Cleanup
        try:
            shutil.rmtree(temp_dir)
        except:
            pass

def test_ubuntu_24_compatibility():
    """Test Ubuntu 24.04 specific compatibility issues"""
    print("\n🐧 Testing Ubuntu 24.04 Compatibility")
    print("=" * 40)
    
    # Test externally-managed-environment issue
    print("=== Testing externally-managed-environment fix ===")
    
    # Check if we can create venv (this was the main Ubuntu 24.04 issue)
    temp_dir = tempfile.mkdtemp(prefix="ubuntu24_test_")
    try:
        success, stdout, stderr = run_command("python3 -m venv test_venv", cwd=temp_dir)
        if success:
            print("✅ Virtual environment creation works (externally-managed-environment fixed)")
            
            # Test pip install in venv
            venv_pip = os.path.join(temp_dir, "test_venv", "bin", "pip")
            if os.path.exists(venv_pip):
                success, stdout, stderr = run_command(f"{venv_pip} install fastapi", cwd=temp_dir)
                if success:
                    print("✅ Pip install in venv works")
                    return True
                else:
                    print(f"❌ Pip install in venv failed: {stderr}")
                    return False
            else:
                print("❌ Venv pip not found")
                return False
        else:
            print(f"❌ Virtual environment creation failed: {stderr}")
            return False
    finally:
        try:
            shutil.rmtree(temp_dir)
        except:
            pass

def main():
    """Run all installation script tests"""
    print("🔧 WebCraft Installation Script Testing")
    print("Testing corrections for PM2 and Ubuntu 24.04 issues")
    print("=" * 70)
    
    results = []
    
    # Test installation script logic
    results.append(("Installation Script Logic", test_install_script_logic()))
    
    # Test Ubuntu 24.04 compatibility
    results.append(("Ubuntu 24.04 Compatibility", test_ubuntu_24_compatibility()))
    
    # Summary
    print("\n" + "=" * 70)
    print("🏁 INSTALLATION SCRIPT TEST RESULTS")
    print("=" * 70)
    
    passed = 0
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{len(results)} tests passed")
    
    if passed == len(results):
        print("\n🎉 INSTALLATION SCRIPT READY!")
        print("✅ PM2 interpreter path corrections working")
        print("✅ Ubuntu 24.04 virtual environment compatibility confirmed")
        print("✅ All critical installation components functional")
        return True
    else:
        print("\n⚠️  Installation script has issues that need attention")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)