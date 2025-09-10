"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getMovieByTitle } from "@/lib/api"
import type { Movie } from "@/lib/api"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden

// Extended list of Malayalam movies for random selection
const MALAYALAM_MOVIES = [
  "Manjummel Boys",
"Premalu",
"Aavesham",
"Bramayugam",
"Guruvayoor Ambalanadayil",
"2018",
"Romancham",
"Neru",
"Kaathal - The Core",
"Nanpakal Nerathu Mayakkam",
"Thallumaala",
"Jaya Jaya Jaya Jaya Hey",
"Rorschach",
"Kumbalangi Nights",
"Drishyam 2",
"The Great Indian Kitchen",
"Jallikattu",
"Malik",
"Minnal Murali",
"Home",
"Pada",
"Hridayam",
"Bheeshma Parvam",
"Jana Gana Mana",
"Palthu Janwar",
"Unda",
"Mahaveeryar",
"Trance",
"Ayyappanum Koshiyum",
"Virus",
"Anjaam Pathiraa",
"Nizhal",
"Malikappuram",
"Ottamuri Velicham",
"Kettiyolaanu Ente Malakha",
"Thondimuthalum Driksakshiyum",
"Take Off",
"Charlie",
"Uyare",
"Vikramadithyan",
"Salt N' Pepper",
"Aadu 2",
"Android Kunjappan Version 5.25",
"Kali",
"Jacobinte Swargarajyam",
"Oru Vadakkan Selfie",
"Kunjiramayanam",
"North 24 Kaatham",
"How Old Are You",
"Ordinary",
"Traffic",
"Banglore Days",
"Ustad Hotel",
"Premam",
"Oru Indian Pranayakatha",
"Thira",
"Ezra",
"Athiran",
"Drishyam",
"Joseph",
"Kammatti Paadam",
"Ozhivudivasathe Kali",
"Maheshinte Prathikaaram",
"Oru CBI Diary Kurippu",
"August 1",
"CID Moosa",
"Kilukkam",
"Manichitrathazhu",
"Chithram",
"Nadodikattu",
"Panchavadipalam",
"Sandesham",
"Kireedam",
"Devasuram",
"Aram + Aram = Kinnaram",
"Ramji Rao Speaking",
"In Harihar Nagar",
"Godfather",
"Vietnam Colony",
"Mazha Peyyunnu Maddalam Kottunnu",
"Boeing Boeing",
"Meesa Madhavan",
"CID Moosa",
"Thenkasipattanam",
"Kalyanaraman",
"Chronic Bachelor",
"Punjabi House",
"Chotta Mumbai",
"Thoppil Joppan",
"Achuvinte Amma",
"Anandabhadram",
"Classmates",
"Notebook",
"Hello",
"Mayavi",
"Chocolate",
"Malarvaadi Arts Club",
"Thattathin Marayathu",
"Om Shanti Oshana",
"Njan Prakashan",
"Oru Cinemakkaran",
"Oru Marubhoomikkadha",
"Veruthe Oru Bharya",
"Puthiya Niyamam",
"Oru Kuttanadan Blog",
"Munthirivallikal Thalirkkumbol",
"Marakkar: Arabikadalinte Simham",
"Kurup",
"Luca",
"Ottaal",
"Kapella",
"Thamasha",
"Sufiyum Sujatayum",
"Kilometers and Kilometers",
"Kaanekkaane",
"Kaaval",
"Vellam: The Essential Drink",
"Minnaminungu",
"Njan Marykutty",
"Ayyar In Pakistan",
"Yuvam",
"Saajan Bakery Since 1962",
"Thinkalazhcha Nishchayam",
"Jo and Jo",
"Super Sharanya",
"Janaki Jaane",
"Varane Avashyamund",
"Alamara",
"Cocktail",
"Best Actor",
"Poppins",
"Daddy Cool",
"Hotel California",
"1 By Two",
"Masala Republic",
"Nee-Na",
"Godha",
"Inspector Dawood Ibrahim",
"Shylock",
"Odiyan",
"Kaaval",
"Madura Raja",
"Big Brother",
"Brother's Day",
"Kasaba",
"Villain",
"Thaskara Veeran",
"Anwar",
"Bachelor Party",
"Beautiful",
"Ee Ma Yau",
"Aarkkariyam",
"Churuli",
"Sherlock Toms",
"Oru Muthassi Gadha",
"Kunjeldho",
"Shubhadinam",
"Kaanthaari",
"Sarvopari Palakkaran",
"Oru Vadakkan Veeragatha",
"Pazhassi Raja",
"Anandabhadram",
"Kayamkulam Kochunni",
"Urumi",
"Cochin Express",
"Dr. Pasupathy",
"Paavam Paavam Rajakumaran",
"Nirakkoottu",
"Ee Thanutha Veluppan Kalathu",
"Kariyilakkaattu Pole",
"Newspaper Boy",
"Kammatipaadam",
"Mayaanadhi",
"Ishq",
"Oruthee",
"Randu",
"Nna Thaan Case Kodu",
"Sathyam Mathrame Bodhipikku",
"Gold",
"Thallumaala",
"Dear Friend",
"Super Saranya",
"Santhoshathinte Onnam Rahasyam",
"Thinkalazhcha Nishchayam",
"Ajagajantharam",
"Thuramukham",
"Malik",
"Kaduva",
"Ariyippu",
"Kaapa",
"Randu",
"Meppadiyan",
"Kuruthi",
"Randu",
"Rani Padmini",
"Madhura Manohara Moham",
"Kanakam Kaamini Kalaham",
"Jan-e-Man",
"Joji",
"Ayyappanum Koshiyum",
"Odum Raja Aadum Rani",
"Chappa Kurishu",
"22 Female Kottayam",
"Aby",
"Alamara",
"Annmariya Kalippilanu",
"Anuraga Karikkin Vellam",
"Thira",
"Jacobinte Swargarajyam",
"Kunjiramayanam",
"Homely Meals",
"Philips and the Monkey Pen",
"Kismath",
"Adi Kapyare Kootamani",
"100 Days of Love",
"Kunjeldho",
"Kettiyolaanu Ente Malakha",
"Ambili",
"Pavada",
"Panchavarnathatha",
"Oru Vadakkan Pennu",
"Ormayil Oru Shishiram",
"Chidambaram",
"Amaram",
"Thoovanathumbikal",
"Namukku Parkkan Munthiri Thoppukal",
"Thoovanathumbikal",
"Swathi Thirunal",
"Oru Vadakkan Veeragatha",
"Perumthachan",
"Vidheyan",
"Kathapurushan",
"Elippathayam",
"Kutty Srank",
"Veettilekkulla Vazhi",
"Sancharam",
"Kanyaka Talkies",
"Ivide",
"Munnariyippu",
"Ozhimuri",
"Kaliyachan",
"Aalorukkam",
"Akale",
"Saira",
"Kazhcha",
"Rithu",
"Shutter",
"Parinayam",
"Margam",
"Kannezhuthi Pottum Thottu",
"Kaliyattam",
"Kannezhuthi Pottum Thottu",
]

// Fun messages to display with the recommendation
const FUN_MESSAGES = [
  "Your Malayalam movie for today is...",
  "Tonight's perfect watch:",
  "The stars have aligned! Your movie is:",
  "Your cinematic destiny today:",
  "Drop everything and watch:",
  "The movie gods have chosen:",
  "Your Malayalam movie adventure awaits with:",
  "Today's special recommendation:",
  "The perfect movie for your mood today:",
]

export default function RandomMovieGenerator() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null)
  const [message, setMessage] = useState("")

  const generateRandomMovie = async () => {
    setLoading(true)
    setOpen(true)

    // Select a random movie from the list
    const randomIndex = Math.floor(Math.random() * MALAYALAM_MOVIES.length)
    const selectedMovie = MALAYALAM_MOVIES[randomIndex]

    // Select a random message
    const randomMessageIndex = Math.floor(Math.random() * FUN_MESSAGES.length)
    setMessage(FUN_MESSAGES[randomMessageIndex])

    try {
      const movieDetails = await getMovieByTitle(selectedMovie)
      setRandomMovie(movieDetails)
    } catch (error) {
      console.error("Error fetching random movie:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={generateRandomMovie}
        className="relative group"
        title="Get a random Malayalam movie recommendation"
      >
        <Sparkles className="h-5 w-5 text-yellow-500 group-hover:animate-pulse" />
        <span className="sr-only">Random Movie Generator</span>
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block text-xs bg-black/80 text-white px-2 py-1 rounded whitespace-nowrap">
          Random Movie
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {loading ? (
            <div className="py-10 text-center">
              <Sparkles className="h-10 w-10 text-yellow-500 animate-pulse mx-auto mb-4" />
              <p className="text-lg font-medium">Finding your perfect Malayalam movie...</p>
            </div>
          ) : randomMovie ? (
            <>
              <DialogHeader>
                <VisuallyHidden>
                  <DialogTitle>Random Movie Recommendation</DialogTitle>
                </VisuallyHidden>
                <DialogTitle className="text-center text-xl">{message}</DialogTitle>
                <DialogDescription className="text-center text-2xl font-bold mt-2">
                  {randomMovie.title}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative w-48 h-64 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={randomMovie.poster || "/placeholder.svg"}
                    alt={randomMovie.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-sm">{randomMovie.year}</p>
                  </div>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">
                    {randomMovie.type}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click the button again for another recommendation!
                  </p>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => setOpen(false)}>Close</Button>
                  <Button variant="outline" onClick={generateRandomMovie}>
                    Try Again
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-10 text-center">
              <p>Couldn't find a movie recommendation. Please try again.</p>
              <Button onClick={() => setOpen(false)} className="mt-4">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
