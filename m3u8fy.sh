input_file="$1"
filename=$(basename "$input_file")
filename="${filename%.*}"

echo "Input file: $input_file"
echo "Output file: $filename"

# ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 800k -b:a 128k -s 640x360 -profile:v baseline -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/low/${filename}.m3u8
# ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 1400k -b:a 192k -s 960x540 -profile:v main -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/mid/${filename}.m3u8
# ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 2800k -b:a 256k -s 1280x720 -profile:v high -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/high/${filename}.m3u8

ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 800k -b:a 128k -vf "scale=640:360" -profile:v baseline -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/low/${filename}.m3u8
ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 1400k -b:a 192k -vf "scale=960:540" -profile:v main -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/mid/${filename}.m3u8
ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 2800k -b:a 256k -vf "scale=1280:720" -profile:v high -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/high/${filename}.m3u8

# Write master playlist
echo "#EXTM3U" > src/hls/${filename}.m3u8
echo "#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=800000" >> src/hls/${filename}.m3u8
echo "low/${filename}.m3u8" >> src/hls/${filename}.m3u8
echo "#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1400000" >> src/hls/${filename}.m3u8
echo "mid/${filename}.m3u8" >> src/hls/${filename}.m3u8
echo "#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2800000" >> src/hls/${filename}.m3u8
echo "high/${filename}.m3u8" >> src/hls/${filename}.m3u8
