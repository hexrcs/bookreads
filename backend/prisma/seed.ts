import { Photon, UserRole } from '@prisma/photon'
const photon = new Photon()

async function populateUsers() {
  const user1 = await photon.users.create({
    data: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password: '$2b$10$ZjONRZAxqX2pLoPax2xdcuzABTUEsFanQI6yBYCRtzpRiU4/X1uIu', // "graphql"
      bio: 'Hi, my name is Alice, and I love reading books!',
    },
  })
  const user2 = await photon.users.create({
    data: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password: '$2b$10$o6KioO.taArzboM44Ig85O3ZFZYZpR3XD7mI8T29eP4znU/.xyJbW', // "secret43"
      bio: 'I am Bob, the co-founder of this amazing website',
      userRole: UserRole.ADMIN,
    },
  })
  console.log('Created users:')
  console.log({ user1, user2 })
  console.log('==========')
}

async function populateAuthors() {
  const authorList = [
    'Andy Weir',
    'J. R. R. Tolkien',
    'Hans Rosling',
    'Anna Rosling Rönnlund',
    'Ola Rosling',
  ]
  const authors = []
  for (const name of authorList) {
    const author = await photon.authors.create({
      data: { name },
    })
    authors.push(author)
  }

  console.log(`Created ${authors.length} authors. A sample:`)
  console.log(authors[0])
  console.log('==========')
}

async function populateGenres() {
  const genreList = Array.from(
    new Set([
      'Adventure',
      'Biography',
      'Business',
      'Nonfiction',
      'Philosophy',
      'Psychology',
      'Science',
      'Science Fiction',
      'Self Help',
      'Art',
      'Biography',
      'Business',
      'Chick Lit',
      "Children's",
      'Christian',
      'Classics',
      'Comics',
      'Contemporary',
      'Cookbooks',
      'Crime',
      'Ebooks',
      'Fantasy',
      'Fiction',
      'Gay and Lesbian',
      'Graphic Novels',
      'Historical Fiction',
      'History',
      'Horror',
      'Humor and Comedy',
      'Manga',
      'Memoir',
      'Music',
      'Mystery',
      'Nonfiction',
      'Paranormal',
      'Philosophy',
      'Poetry',
      'Psychology',
      'Religion',
      'Romance',
      'Science',
      'Science Fiction',
      'Self Help',
      'Suspense',
      'Spirituality',
      'Sports',
      'Thriller',
      'Travel',
      'Young Adult',
    ]),
  )
  const genres = []
  for (const name of genreList) {
    const genre = await photon.genres.create({
      data: { name },
    })
    genres.push(genre)
  }

  console.log(`Created ${genres.length} genres. A sample:`)
  console.log(genres[0])
  console.log('==========')
}

async function populateBooks() {
  // Adding book1 - Factfulness
  const hansRosling = await photon.authors.findOne({
    where: { name: 'Hans Rosling' },
  })
  const olaRosling = await photon.authors.findOne({
    where: { name: 'Ola Rosling' },
  })
  const annaRoslingRönnlund = await photon.authors.findOne({
    where: { name: 'Anna Rosling Rönnlund' },
  })
  const nonfiction = await photon.genres.findOne({
    where: { name: 'Nonfiction' },
  })

  const book1 = await photon.books.create({
    data: {
      name: 'Factfulness',
      description: `Factfulness: Ten Reasons We're Wrong About the World – and Why Things Are Better Than You Think is a 2018 book by Swedish statistician Hans Rosling with his son Ola Rosling and daughter-in-law Anna Rosling Rönnlund. In the book, Rosling suggests the vast majority of human beings are wrong about the state of the world. `,
      authors: {
        connect: [
          { id: hansRosling?.id },
          { id: olaRosling?.id },
          { id: annaRoslingRönnlund?.id },
        ],
      },
      genres: { connect: [{ id: nonfiction?.id }] },
      isbn: '978-1250107817',
      coverUrl: 'http://covers.openlibrary.org/b/isbn/978-1250107817-L.jpg',
    },
  })

  // Adding books by Andy Weir
  const andyWeir = await photon.authors.findOne({
    where: { name: 'Andy Weir' },
  })
  const scienceFiction = await photon.genres.findOne({
    where: { name: 'Science Fiction' },
  })
  const book2 = await photon.books.create({
    data: {
      name: 'The Martian',
      description: `The Martian is a 2011 science fiction novel written by Andy Weir The story follows an American astronaut, Mark Watney, as he becomes stranded alone on Mars in the year 2035 and must improvise in order to survive. `,
      authors: {
        connect: [{ id: andyWeir?.id }],
      },
      genres: { connect: [{ id: scienceFiction?.id }] },
      isbn: '978-0804139021',
      coverUrl: 'http://covers.openlibrary.org/b/isbn/978-0804139021-L.jpg',
    },
  })
  const book3 = await photon.books.create({
    data: {
      name: 'Artemis',
      description: `Artemis is a 2017 science fiction novel written by Andy Weir. The novel takes place in the late 2080s and is set in Artemis, the first and so far only city on the Moon. It follows the life of porter and smuggler Jasmine "Jazz" Bashara as she gets caught up in a conspiracy for control of the city. `,
      authors: {
        connect: [{ id: andyWeir?.id }],
      },
      genres: { connect: [{ id: scienceFiction?.id }] },
      isbn: '978-0553448122',
      coverUrl: 'http://covers.openlibrary.org/b/isbn/978-0553448122-L.jpg',
    },
  })

  // Adding books by J. R. R. Tolkien
  const jrrTolkien = await photon.authors.findOne({
    where: { name: 'J. R. R. Tolkien' },
  })
  const adventure = await photon.genres.findOne({
    where: { name: 'Adventure' },
  })
  const fantasy = await photon.genres.findOne({
    where: { name: 'Fantasy' },
  })
  const book4 = await photon.books.create({
    data: {
      name: 'The Lord of the Rings',
      description: `The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work. Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling novels ever written, with over 150 million copies sold. `,
      authors: {
        connect: [{ id: jrrTolkien?.id }],
      },
      genres: { connect: [{ id: adventure?.id }, { id: fantasy?.id }] },
      isbn: '978-0618640157',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51bJhsl5VmL.jpg',
    },
  })

  console.log(`Books created:`)
  console.log({ book1, book2, book3, book4 })
  console.log('==========')
}

async function populateComments() {
  const alice = await photon.users.findOne({
    where: { email: 'alice@prisma.io' },
    select: { id: true },
  })

  const factfulness = (
    await photon.books.findMany({
      where: { name: 'Factfulness' },
      select: { id: true },
    })
  )[0]

  const comment1 = await photon.comments.create({
    data: {
      book: { connect: { id: factfulness?.id } },
      content:
        'This book is a must-read for everyone who wants to be less biased',
      rating: 5,
      user: { connect: { id: alice?.id } },
    },
  })

  console.log('Created comments:')
  console.log({ comment1 })
  console.log('==========')
}

async function main() {
  await populateUsers()
  await populateAuthors()
  await populateGenres()
  await populateBooks()
  await populateComments()
}

main().finally(async () => {
  await photon.disconnect()
})
