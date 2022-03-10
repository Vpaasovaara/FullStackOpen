// 4.3: apufunktioita ja yksikkötestejä, step1
const dummy = (blogs) => {
    return 1
}

// 4.4: apufunktioita ja yksikkötestejä, step2
const totalLikes = (blogs) => {
    return blogs
        .map(blog => blog = blog.likes)
        .reduce((acc, cur) => acc + cur)
}


// 4.5*: apufunktioita ja yksikkötestejä, step3
const favoriteBlog = (blogs) => {
    let likeList = blogs.map(x => x = x.likes)
    let favorite = likeList.reduce(function (previousLargestNumber, currentLargestNumber) {
        return (currentLargestNumber > previousLargestNumber) ? currentLargestNumber : previousLargestNumber;
      }, 0)
    
    let index = likeList.indexOf(favorite)
    return blogs[index]
}

// 4.6*: apufunktioita ja yksikkötestejä, step4
const mostBlogs = (blogs) => {
    let authorList = blogs.map(x => x = x.author)
    console.log("authorList", authorList)
    let counts = authorList.reduce((a, c) => {
        a[c] = (a[c] || 0) + 1
        return a
    }, {})
    let maxCount = Math.max(...Object.values(counts))
    let mostFrequent = Object.keys(counts)
        .filter(k => counts[k] === maxCount)
    let newAuthor = mostFrequent[0]
    //console.log("newAuthor", newAuthor)
    //console.log(typeof newAuthor)
    let count = authorList.filter(x => x === newAuthor)
    //console.log("count", count)
    let final = { author: newAuthor, blogs: count.length }

    return final
}

// 4.7*: apufunktioita ja yksikkötestejä, step5
const mostLikes = (blogs) => {
    let listLikes = blogs.map(x => x = x.likes)
    //console.log(`listLikes`, listLikes)

    let max = Math.max(...listLikes)
    //console.log('max', max)

    let index = listLikes.indexOf(max)
    //console.log(`index`, index)

    let newAuthor = blogs[index].author
    //console.log(`newAuthor`, newAuthor)

    let likesAll = blogs
        .filter(x => x.author === newAuthor)
        .map(x => x = x.likes)
        .reduce((acc, cur) => acc + cur, 0)

    let final = { author: newAuthor, likes: likesAll }

    return final
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}