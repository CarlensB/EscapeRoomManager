import sys
import traceback
import subprocess as sub

class DependancyInstall:
    def __init__(self, *args, ):
        self.__dependancy =  [stuff for stuff in args]
        self.__arguments = ["python", "pip.exe", "install"]
        print(self.__install_stuff())
        
    # def __call__(self, *args: any, **kwds: any) -> any:
    #     print(self.__install_stuff())
        
    def __install_stuff(self):
        for d in self.__dependancy:
            try:
                sub.run(["C:\Python310\Scripts\pip.exe",  "install", d], check=True, capture_output=True)
                return "installation succeeded"
            except sub.CalledProcessError as e:
                trace = traceback.format_exception(e)
                return f"Installation failed with {d}, {''.join(trace)}"

if __name__ == "__main__":
    d = DependancyInstall("bcrypt", "mysql-connector-python")
