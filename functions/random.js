function template(posts,submission=null) {
    const submissionReceived = submission ? 
    `<div id="submission_received">Your submission has been received. (${Date()})</div>` : '';
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
</head>
<body>
<h1> Hypertape </h1>
<form action="" method="get" class="form-example">
    <label for="submission"></label>
    <input type="text" name="submission" id="submission" required>
    <input type="submit" value="Post">
</form>
    ${submissionReceived}
    <div class='post'>${posts.join('</div>\n<div class='post'>')}</div>
</body>
</html>`;
}

export async function onRequestGet(context) {
    const posts = JSON.parse(
        await context.env.HYPERTAPE_KV.get("hypertape-blob")
    );
    const submission = false;
    return new Response(template(posts,submission));
}
