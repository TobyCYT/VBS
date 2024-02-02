input_file="$1"
filename=$(basename "$input_file")
filename="${filename%.*}"

echo "Input file: $input_file"
echo "Output file: $filename"

# ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 800k -b:a 128k -s 640x360 -profile:v baseline -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/low/${filename}.m3u8
# ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 1400k -b:a 192k -s 960x540 -profile:v main -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/mid/${filename}.m3u8
# ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 2800k -b:a 256k -s 1280x720 -profile:v high -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/high/${filename}.m3u8


ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 800k -b:a 128k -s 360x640 -profile:v baseline -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/low/${filename}.m3u8
ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 1400k -b:a 192k -s 540x960 -profile:v main -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/mid/${filename}.m3u8
ffmpeg -i $input_file -c:v libx264 -c:a aac -b:v 2800k -b:a 256k -s 720x1280 -profile:v high -preset medium -hls_time 10 -hls_list_size 0 -f hls src/hls/high/${filename}.m3u8
