export type Playlist =
  | "drive"
  | "mellow"
  | "nostalgia"
  | "veritas"
  | "world";

export type Track = {
  title: string;
  artist: string;
  src: string;
  playlist: Playlist;
};

export const PLAYLISTS: ("all" | Playlist)[] = [
  "all",
  "drive",
  "mellow",
  "nostalgia",
  "veritas",
  "world",
];

export const TRACKS: Track[] = [
  {
    title: "505",
    artist: "Arctic Monkeys",
    playlist: "drive",
    src: "./music/drive/Arctic Monkeys - 505.mp3",
  },
  {
    title: "Do I Wanna Know",
    artist: "Arctic Monkeys",
    playlist: "drive",
    src: "./music/drive/Arctic Monkeys - Do I Wanna Know.mp3",
  },
  {
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    playlist: "drive",
    src: "./music/drive/Arctic Monkeys - I Wanna Be Yours.mp3",
  },
  {
    title: "No. 1 Party Anthem",
    artist: "Arctic Monkeys",
    playlist: "drive",
    src: "./music/drive/Arctic Monkeys - No. 1 Party Anthem.mp3",
  },
  {
    title: "Kita Slamanya",
    artist: "Bondan Prakoso Ft. Fade 2 Black",
    playlist: "drive",
    src: "./music/drive/Bondan Prakoso Ft. Fade 2 Black - Kita Slamanya.mp3",
  },
  {
    title: "Ya Sudahlah",
    artist: "Bondan Prakoso Ft. Fade 2 Black",
    playlist: "drive",
    src: "./music/drive/Bondan Prakoso Ft. Fade 2 Black - Ya Sudahlah.mp3",
  },
  {
    title: "Zona Nyaman (SMVLL Cover)",
    artist: "Fourtwnty",
    playlist: "drive",
    src: "./music/drive/Fourtwnty - Zona Nyaman (SMVLL Cover).mp3",
  },
  {
    title: "L",
    artist: "Halstage",
    playlist: "drive",
    src: "./music/drive/Halstage - L.mp3",
  },
  {
    title: "Bercanda Di Malam Indah",
    artist: "Kugiran Masdo",
    playlist: "drive",
    src: "./music/drive/Kugiran Masdo - Bercanda Di Malam Indah.mp3",
  },
  {
    title: "Berduka Lara",
    artist: "Kugiran Masdo",
    playlist: "drive",
    src: "./music/drive/Kugiran Masdo - Berduka Lara.mp3",
  },
  {
    title: "Janji Manis",
    artist: "Kugiran Masdo",
    playlist: "drive",
    src: "./music/drive/Kugiran Masdo - Janji Manis.mp3",
  },
  {
    title: "Teruna & Dara",
    artist: "Kugiran Masdo",
    playlist: "drive",
    src: "./music/drive/Kugiran Masdo - Teruna & Dara.mp3",
  },
  {
    title: "7 Years",
    artist: "Lukas Graham",
    playlist: "drive",
    src: "./music/drive/Lukas_Graham - 7 Years.mp3",
  },
  {
    title: "Don't Look Back In Anger",
    artist: "Oasis",
    playlist: "drive",
    src: "./music/drive/Oasis - Don't Look Back In Anger.mp3",
  },
  {
    title: "To The Bone",
    artist: "Pamungkas",
    playlist: "drive",
    src: "./music/drive/Pamungkas - To The Bone.mp3",
  },
  {
    title: "JALAN PANJANG (Ft. GUNTUR SIMBOLON)",
    artist: "SAYKOJI",
    playlist: "drive",
    src: "./music/drive/SAYKOJI - JALAN PANJANG (Ft. GUNTUR SIMBOLON).mp3",
  },
  {
    title: "Happy",
    artist: "Skinnyfabs",
    playlist: "drive",
    src: "./music/drive/Skinnyfabs - Happy.mp3",
  },
  {
    title: "Ada Aku Disini (SMVLL Cover)",
    artist: "Wahyu",
    playlist: "drive",
    src: "./music/drive/Wahyu - Ada Aku Disini (SMVLL Cover).mp3",
  },
  {
    title: "Hanya Rindu",
    artist: "Andmesh",
    playlist: "mellow",
    src: "./music/mellow/Andmesh - Hanya Rindu.mp3",
  },
  {
    title: "Apa Kabar Sayang",
    artist: "Armada",
    playlist: "mellow",
    src: "./music/mellow/Armada - Apa Kabar Sayang.mp3",
  },
  {
    title: "Hargai Aku",
    artist: "Armada",
    playlist: "mellow",
    src: "./music/mellow/Armada - Hargai Aku.mp3",
  },
  {
    title: "Harusnya Aku",
    artist: "Armada",
    playlist: "mellow",
    src: "./music/mellow/Armada - Harusnya Aku.mp3",
  },
  {
    title: "Savior",
    artist: "Beowulf",
    playlist: "mellow",
    src: "./music/mellow/Beowulf - Savior.mp3",
  },
  {
    title: "Resah Jadi Luka",
    artist: "Daun Jatuh",
    playlist: "mellow",
    src: "./music/mellow/Daun Jatuh - Resah Jadi Luka.mp3",
  },
  {
    title: "Halu",
    artist: "Feby Putri",
    playlist: "mellow",
    src: "./music/mellow/Halu - Feby Putri.mp3",
  },
  {
    title: "Takut",
    artist: "Idgitaf",
    playlist: "mellow",
    src: "./music/mellow/Idgitaf - Takut.mp3",
  },
  {
    title: "DUKA",
    artist: "Last Child",
    playlist: "mellow",
    src: "./music/mellow/Last Child - DUKA.mp3",
  },
  {
    title: "Bertaut",
    artist: "Nadin Amizah",
    playlist: "mellow",
    src: "./music/mellow/Nadin Amizah - Bertaut.mp3",
  },
  {
    title: "Let Her Go",
    artist: "Passenger",
    playlist: "mellow",
    src: "./music/mellow/Passenger - Let Her Go.mp3",
  },
  {
    title: "Perayaan Mati Rasa",
    artist: "Umay Shahab (Ft. Natania Karin)",
    playlist: "mellow",
    src: "./music/mellow/Perayaan Mati Rasa - Umay Shahab (Ft. Natania Karin).mp3",
  },
  {
    title: "Di Ujung Jalan",
    artist: "SAMSONS",
    playlist: "mellow",
    src: "./music/mellow/SAMSONS - Di Ujung Jalan.mp3",
  },
  {
    title: "Past Lives",
    artist: "SapientDream",
    playlist: "mellow",
    src: "./music/mellow/SapientDream - Past Lives.mp3",
  },
  {
    title: "Tentang Rindu",
    artist: "Virzha",
    playlist: "mellow",
    src: "./music/mellow/Virzha - Tentang Rindu.mp3",
  },
  {
    title: "Poetic Words",
    artist: "Against the System",
    playlist: "nostalgia",
    src: "./music/nostalgia/Against the System - Poetic Words.mp3",
  },
  {
    title: "Dear God",
    artist: "Avenged Sevenfold",
    playlist: "nostalgia",
    src: "./music/nostalgia/Avenged Sevenfold - Dear God.mp3",
  },
  {
    title: "Pompeii",
    artist: "Bastille",
    playlist: "nostalgia",
    src: "./music/nostalgia/Bastille - Pompeii.mp3",
  },
  {
    title: "Dandelions",
    artist: "Ruth B",
    playlist: "nostalgia",
    src: "./music/nostalgia/Dandelions - Ruth B.mp3",
  },
  {
    title: "Lemon Tree",
    artist: "Fool's Garden",
    playlist: "nostalgia",
    src: "./music/nostalgia/Fool's Garden - Lemon Tree.mp3",
  },
  {
    title: "If You Know That I'm Lonely",
    artist: "FUR",
    playlist: "nostalgia",
    src: "./music/nostalgia/FUR - If You Know That I'm Lonely.mp3",
  },
  {
    title: "Buttercup",
    artist: "Jack Stauber",
    playlist: "nostalgia",
    src: "./music/nostalgia/Jack_Stauber - Buttercup.mp3",
  },
  {
    title: "Kepompong",
    artist: "Sind3ntosca",
    playlist: "nostalgia",
    src: "./music/nostalgia/Kepompong - Sind3ntosca.mp3",
  },
  {
    title: "Lupa-Lupa Tapi Ingat",
    artist: "KUBURAN",
    playlist: "nostalgia",
    src: "./music/nostalgia/KUBURAN - Lupa-Lupa Tapi Ingat.mp3",
  },
  {
    title: "Homage",
    artist: "Mild High Club",
    playlist: "nostalgia",
    src: "./music/nostalgia/Mild High Club - Homage.mp3",
  },
  {
    title: "Play Date",
    artist: "Melanie Martinez",
    playlist: "nostalgia",
    src: "./music/nostalgia/Play Date - Melanie Martinez.mp3",
  },
  {
    title: "Safe and Sound",
    artist: "Rebelution",
    playlist: "nostalgia",
    src: "./music/nostalgia/Rebelution - Safe and Sound.mp3",
  },
  {
    title: "Never Gonna Give You Up",
    artist: "Rick Astley",
    playlist: "nostalgia",
    src: "./music/nostalgia/Rick Astley - Never Gonna Give You Up.mp3",
  },
  {
    title: "Changes (Remix)",
    artist: "XXXTENTACION",
    playlist: "nostalgia",
    src: "./music/nostalgia/XXXTENTACION - Changes (Remix).mp3",
  },
  {
    title: "Jocelyn Flores",
    artist: "XXXTENTACION",
    playlist: "nostalgia",
    src: "./music/nostalgia/XXXTENTACION - Jocelyn Flores.mp3",
  },
  {
    title: "All Falls Down (Ft. Noah Cyrus with Digital Farm Animals)",
    artist: "Alan Walker",
    playlist: "veritas",
    src: "./music/veritas/Alan Walker - All Falls Down (Ft. Noah Cyrus with Digital Farm Animals).mp3",
  },
  {
    title: "Darkside (Ft. Au Ra and Tomine Harket)",
    artist: "Alan Walker",
    playlist: "veritas",
    src: "./music/veritas/Alan Walker - Darkside (Ft. Au Ra and Tomine Harket).mp3",
  },
  {
    title: "On My Way (Ft. Sabrina Carpenter & Farruko)",
    artist: "Alan Walker",
    playlist: "veritas",
    src: "./music/veritas/Alan Walker - On My Way (Ft. Sabrina Carpenter & Farruko).mp3",
  },
  {
    title: "Sing Me To Sleep",
    artist: "Alan Walker",
    playlist: "veritas",
    src: "./music/veritas/Alan Walker - Sing Me To Sleep.mp3",
  },
  {
    title: "The Spectre",
    artist: "Alan Walker",
    playlist: "veritas",
    src: "./music/veritas/Alan Walker - The Spectre.mp3",
  },
  {
    title: "Unity (Ft. Walkers)",
    artist: "Alan Walker",
    playlist: "veritas",
    src: "./music/veritas/Alan Walker - Unity (Ft. Walkers).mp3",
  },
  {
    title: "Lily",
    artist: "Alan Walker, K-391 & Emelie Hollow",
    playlist: "veritas",
    src: "./music/veritas/Alan Walker, K-391 & Emelie Hollow - Lily.mp3",
  },
  {
    title: "PLAY",
    artist: "Alan Walker, K-391, Tungevaag, Mangoo",
    playlist: "veritas",
    src: "./music/veritas/Alan Walker, K-391, Tungevaag, Mangoo - PLAY.mp3",
  },
  {
    title: "Eid Mubarak (Ft. Shujat Ali Khan)",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - Eid Mubarak (Ft. Shujat Ali Khan).mp3",
  },
  {
    title: "Good Life",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - Good Life.mp3",
  },
  {
    title: "I Promise",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - I Promise.mp3",
  },
  {
    title: "Love Who You Are",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - Love Who You Are.mp3",
  },
  {
    title: "My Hero",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - My Hero.mp3",
  },
  {
    title: "Paradise (Ft. Jae Deen)",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - Paradise (Ft. Jae Deen).mp3",
  },
  {
    title: "Rasool Allah",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - Rasool Allah.mp3",
  },
  {
    title: "Salam Alaikum",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - Salam Alaikum.mp3",
  },
  {
    title: "Save Me From Myself",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - Save Me From Myself.mp3",
  },
  {
    title: "Worth It (Ft. Saif Adam)",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - Worth It (Ft. Saif Adam).mp3",
  },
  {
    title: "You Are My Life",
    artist: "Harris J",
    playlist: "world",
    src: "./music/world/Harris J - You Are My Life.mp3",
  },
  {
    title: "Human",
    artist: "Harris J.",
    playlist: "world",
    src: "./music/world/Harris J. - Human.mp3",
  },
];
