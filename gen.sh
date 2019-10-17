F=$1
for i in `seq \`cat $F | grep '### Example.*:' | wc -l\``; do
    echo $i
    PATTERN=`cat $F | grep '### Example.*:' | head -$i | tail -1`
    REPLACE=`cat $F | grep '### Example.*:' | head -$i | tail -1 | sed -e "s/Example.*:/Example $i:/"`
    echo $PATTERN
    echo $REPLACE
    echo
    sed -i.bak "s/$PATTERN/$REPLACE/" $F
done
