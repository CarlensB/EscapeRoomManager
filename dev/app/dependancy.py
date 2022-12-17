import sys
import traceback
import subprocess as sub

class DependancyInstall:
    def __init__(self, *args, path="C:\Python310\Scripts\pip.exe"):
        self.__dependancy =  [stuff for stuff in args]
        self.__path = path
        
    def install_stuff(self):
        for d in self.__dependancy:
            try:
                sub.run([self.__path,  "install", d], check=True, capture_output=True)
                msg = "installation succeeded"
            except sub.CalledProcessError as e:
                trace = traceback.format_exception(e)
                return f"Installation failed with {d}, {''.join(trace)}"
        return msg
