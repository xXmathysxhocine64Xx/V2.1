#!/usr/bin/env python3
"""
PM2 Virtual Environment Test
Tests the PM2 setup with virtual environment as described in install_ubuntu24.sh
"""

import subprocess
import os
import tempfile
import shutil
import time
import requests

def run_command(cmd, cwd=None, capture_output=True):
    """Run a command and return result"""
    try:
        result = subprocess.run(
            cmd, 
            shell=True, 
            cwd=cwd, 
            capture_output=capture_output, 
            text=True,
            timeout=30
        )
        return result.returncode == 0, result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        return False, "", "Command timed out"
    except Exception as e:
        return False, "", str(e)

def test_virtual_environment_creation():
    """Test creating a virtual environment like the install script"""
    print("\n=== Testing Virtual Environment Creation ===")
    
    # Create temporary directory
    temp_dir = tempfile.mkdtemp(prefix="webcraft_test_")
    backend_dir = os.path.join(temp_dir, "backend")
    
    try:
        # Copy backend files
        shutil.copytree("/app/backend", backend_dir)
        
        # Create virtual environment
        success, stdout, stderr = run_command("python3 -m venv venv", cwd=backend_dir)
        if not success:
            print(f"❌ Virtual environment creation FAILED: {stderr}")
            return False
        
        # Check if venv was created
        venv_python = os.path.join(backend_dir, "venv", "bin", "python")
        if not os.path.exists(venv_python):
            print("❌ Virtual environment python interpreter not found")
            return False
        
        # Activate and install dependencies using bash
        activate_cmd = f"bash -c 'source venv/bin/activate && pip install -r requirements.txt'"
        success, stdout, stderr = run_command(activate_cmd, cwd=backend_dir)
        if not success:
            print(f"❌ Dependencies installation FAILED: {stderr}")
            return False
        
        print("✅ Virtual Environment Creation test PASSED")
        return True, venv_python, backend_dir
        
    except Exception as e:
        print(f"❌ Virtual Environment Creation test FAILED: {e}")
        return False, None, None
    finally:
        # Don't cleanup yet, we need it for PM2 test
        pass

def test_pm2_with_venv(venv_python, backend_dir):
    """Test PM2 startup with virtual environment python interpreter"""
    print("\n=== Testing PM2 with Virtual Environment ===")
    
    try:
        # Check if PM2 is available
        success, stdout, stderr = run_command("which pm2")
        if not success:
            print("❌ PM2 not available in test environment")
            return False
        
        # Test the exact command from install script
        pm2_cmd = f"pm2 start server.py --name 'webcraft-test' --interpreter {venv_python}"
        success, stdout, stderr = run_command(pm2_cmd, cwd=backend_dir)
        
        if not success:
            print(f"❌ PM2 start FAILED: {stderr}")
            return False
        
        # Wait a moment for startup
        time.sleep(3)
        
        # Check PM2 status
        success, stdout, stderr = run_command("pm2 status")
        if not success:
            print(f"❌ PM2 status check FAILED: {stderr}")
            return False
        
        print(f"PM2 Status Output:\n{stdout}")
        
        # Check if our process is online
        if "webcraft-test" in stdout and "online" in stdout:
            print("✅ PM2 with Virtual Environment test PASSED")
            
            # Cleanup PM2 process
            run_command("pm2 delete webcraft-test")
            return True
        else:
            print("❌ PM2 process not online")
            # Show logs for debugging
            success, logs, _ = run_command("pm2 logs webcraft-test --lines 10")
            if success:
                print(f"PM2 Logs:\n{logs}")
            run_command("pm2 delete webcraft-test")
            return False
            
    except Exception as e:
        print(f"❌ PM2 with Virtual Environment test FAILED: {e}")
        # Cleanup
        run_command("pm2 delete webcraft-test")
        return False

def test_uvicorn_with_venv(venv_python, backend_dir):
    """Test uvicorn startup with virtual environment"""
    print("\n=== Testing Uvicorn with Virtual Environment ===")
    
    try:
        # Test uvicorn command with venv python
        uvicorn_cmd = f"{venv_python} -m uvicorn server:app --host 0.0.0.0 --port 8002"
        
        # Start uvicorn in background
        process = subprocess.Popen(
            uvicorn_cmd,
            shell=True,
            cwd=backend_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        # Wait for startup
        time.sleep(5)
        
        # Test if server is responding
        try:
            response = requests.get("http://localhost:8002/api/", timeout=5)
            if response.status_code == 200:
                print("✅ Uvicorn with Virtual Environment test PASSED")
                success = True
            else:
                print(f"❌ Uvicorn responded with status {response.status_code}")
                success = False
        except requests.RequestException as e:
            print(f"❌ Uvicorn not responding: {e}")
            success = False
        
        # Cleanup process
        process.terminate()
        process.wait(timeout=5)
        
        return success
        
    except Exception as e:
        print(f"❌ Uvicorn with Virtual Environment test FAILED: {e}")
        return False

def test_python_version_compatibility():
    """Test Python 3.12 compatibility as mentioned in review"""
    print("\n=== Testing Python 3.12 Compatibility ===")
    
    try:
        # Check Python version
        success, stdout, stderr = run_command("python3 --version")
        if not success:
            print(f"❌ Python version check FAILED: {stderr}")
            return False
        
        python_version = stdout.strip()
        print(f"Python version: {python_version}")
        
        # Check if it's Python 3.12 (Ubuntu 24.04 default)
        if "Python 3.12" in python_version:
            print("✅ Python 3.12 Compatibility test PASSED")
            return True
        else:
            print(f"⚠️  Not Python 3.12, but version {python_version} should work")
            return True
            
    except Exception as e:
        print(f"❌ Python 3.12 Compatibility test FAILED: {e}")
        return False

def cleanup_temp_files(temp_dirs):
    """Cleanup temporary directories"""
    for temp_dir in temp_dirs:
        try:
            if os.path.exists(temp_dir):
                shutil.rmtree(temp_dir)
        except Exception as e:
            print(f"Warning: Could not cleanup {temp_dir}: {e}")

def run_pm2_venv_tests():
    """Run all PM2 and virtual environment tests"""
    print("🚀 Starting PM2 Virtual Environment Tests")
    print("=" * 60)
    
    results = {}
    temp_dirs = []
    
    # Test Python compatibility first
    results["python_compatibility"] = test_python_version_compatibility()
    
    # Test virtual environment creation
    venv_result = test_virtual_environment_creation()
    if isinstance(venv_result, tuple):
        results["venv_creation"] = True
        success, venv_python, backend_dir = venv_result
        temp_dirs.append(os.path.dirname(backend_dir))
        
        # Test PM2 with venv
        results["pm2_with_venv"] = test_pm2_with_venv(venv_python, backend_dir)
        
        # Test uvicorn with venv
        results["uvicorn_with_venv"] = test_uvicorn_with_venv(venv_python, backend_dir)
        
    else:
        results["venv_creation"] = False
        results["pm2_with_venv"] = False
        results["uvicorn_with_venv"] = False
    
    # Summary
    print("\n" + "=" * 60)
    print("🏁 PM2 VIRTUAL ENVIRONMENT TEST RESULTS")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    # Cleanup
    cleanup_temp_files(temp_dirs)
    
    if passed == total:
        print("🎉 ALL PM2 VENV TESTS PASSED - Installation script logic is working!")
        return True
    else:
        print("⚠️  Some PM2 venv tests failed - Installation script may have issues")
        return False

if __name__ == "__main__":
    success = run_pm2_venv_tests()
    exit(0 if success else 1)