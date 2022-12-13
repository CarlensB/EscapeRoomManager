import sys
import traceback
import subprocess as sub

class DependancyInstall:
    def __init__(self, *args, ):
        self.__dependancy =  [stuff for stuff in args]
        self.__arguments = ["python", "pip.exe", "install"]
        
    def __call__(self, *args: any, **kwds: any) -> any:
        print(self.__install_stuff(*args))
        
    def __install_stuff(self, *args):
        for d in self.__dependancy:
            try:
                sub.run(["C:\Python310\Scripts\pip.exe",  self.__arguments[2], d], check=True, capture_output=True)
                msg = "installation succeeded"
            except sub.CalledProcessError as e:
                trace = traceback.format_exception(e)
                return f"Installation failed with {d}, {''.join(trace)}"
        return msg
