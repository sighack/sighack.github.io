cp ~/Documents/Processing/watercolor2/*.tif .
for i in *.tif; do
    echo $i;
    convert $i `echo $i | sed -e 's/.tif//g'`.png;
done
