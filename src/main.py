import os
import uvicorn
from fastapi import FastAPI, Header, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, StreamingResponse, Response, FileResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="src/static",html = True), name="static")

@app.get("/", response_class=HTMLResponse)
def read_root():
    # Serve the 'index.html' file
    return open("src/templates/index.html").read()

@app.get("/hls/{file_path:path}")
async def read_hls(file_path: str):
    # file_path += ".m3u8"
    file_location = os.path.join("src/hls/", file_path)
    def iterfile():
        with open(file_location, mode='rb') as f:
            yield from f
    return StreamingResponse(iterfile(), media_type="application/x-mpegURL")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)