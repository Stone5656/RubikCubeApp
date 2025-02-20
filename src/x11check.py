import glfw

if not glfw.init():
    print("GLFW initialization failed!")
else:
    print("GLFW is working!")
    glfw.terminate()
