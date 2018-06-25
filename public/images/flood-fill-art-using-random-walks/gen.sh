FOLDER=$1
for i in `ls ${FOLDER}/lowres-* | sed -e 's/.*lowres-\(.*\).png/\1/g'`; do echo "<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/${FOLDER}/highres-${i}.png' target='_blank'>"'!'"[](/public/images/flood-fill-art-using-random-walks/${FOLDER}/lowres-${i}.png)</a>" ; done
