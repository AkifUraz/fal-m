import shutil
import sys
source_path = "C:\\Users\\Uraz\\.gemini\\antigravity\\brain\\cd656d02-34f8-4854-86d1-5a7da0ddadc7\\media__1775844906548.png"
dest_path = "public/logo.png"
shutil.copyfile(source_path, dest_path)
print("Copied successfully")
