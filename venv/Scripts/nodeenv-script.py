<<<<<<< HEAD
#!"C:\Users\T Baby\Documents\GitHub\P465\Medifast\Medifast\venv\Scripts\python.exe"
=======
#!"C:\Users\T Baby\Documents\GitHub\CleanMed\Medifast\Medifast\venv\Scripts\python.exe"
>>>>>>> 21c39b2794a5cd531a92f0b34d70c9547ee0ef8d
# EASY-INSTALL-ENTRY-SCRIPT: 'nodeenv==1.3.2','console_scripts','nodeenv'
__requires__ = 'nodeenv==1.3.2'
import re
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(
        load_entry_point('nodeenv==1.3.2', 'console_scripts', 'nodeenv')()
    )
