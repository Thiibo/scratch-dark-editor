import time
from os.path import dirname
from os import system as run
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
  
cd = dirname(__file__)
class Watcher:
    # Set the directory on watch
    watchDirectory = cd + '/../style/'
  
    def __init__(self):
        self.observer = Observer()
  
    def run(self):
        event_handler = Handler()
        self.observer.schedule(event_handler, self.watchDirectory, recursive = True)
        self.observer.start()
        try:
            while True:
                time.sleep(5)
        except:
            self.observer.stop()
            print("Observer Stopped")
  
        self.observer.join()
  
  
class Handler(FileSystemEventHandler):
    @staticmethod
    def on_any_event(event):
        print('reloaded!')
        run(f"python {cd}/exportUserCSS.py")
  
if __name__ == '__main__':
    watch = Watcher()
    watch.run()