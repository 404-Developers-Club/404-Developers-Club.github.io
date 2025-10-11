function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}

//runs typewriting script whenever webpage loads up
window.addEventListener("load", async () => {
    let tagLine = "RHS's Only Coding Club"
    let tagLineElement = document.getElementsByClassName("tagLine")[0]

    for (let i=0; i < tagLine.length; i++)
    {
        await sleep(0.05)
        tagLineElement.innerHTML += tagLine[i]
    }
})