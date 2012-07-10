VERSION=$(shell cat version.txt)
VER = sed s/@VERSION/${VERSION}/
DATE=`git log --pretty=format:'%ad' -1`

HEADER=header.txt

    

build:
	@@echo "Removing old build";

	@@rm -rf dist/ && mkdir dist \
	
	@@echo "Minifying Plugin";

	@@uglifyjs -nc js/jquery.textareaAutoHeight.js > dist/jquery.textareaAutoHeight.min.js 

	@@cat $(HEADER) | \
		sed 's/Date:./&'"${DATE}"'/' | \
		$(VER) | \
		cat - dist/jquery.textareaAutoHeight.min.js > dist/tmp && mv dist/tmp dist/jquery.textareaAutoHeight.min.js

