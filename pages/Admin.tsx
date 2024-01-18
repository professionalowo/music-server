const Admin = () => {
    return <div>
        <form method="post" enctype="multipart/form-data" class="flex flex-col gap-3">
            <div class="flex flex-col gap-4">
                <label for="name">Name:</label>
                <input readonly id="name" name="name" class="bg-slate-600" type="text" required></input>
                <label for="file">Upload MP3 file:</label>
                <input type="file" id="file" name="file" accept="audio/mp3" required />
            </div>
            <div>
                <button>Submit</button>
            </div>
            <script src="/static/upload.js" defer />
        </form>
    </div>
}

export default Admin;