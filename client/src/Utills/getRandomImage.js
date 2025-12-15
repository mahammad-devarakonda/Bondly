const imageArray = [
    "https://www.shutterstock.com/image-photo/happy-multigenerational-people-having-fun-600nw-2276453329.jpg",
    "https://st4.depositphotos.com/2760050/24930/i/450/depositphotos_249303264-stock-photo-girl-joyful-smiling-face-over.jpg",
    "https://cbx-prod.b-cdn.net/COLOURBOX61207252.jpg?width=800&height=800&quality=70",
    "https://www.shutterstock.com/image-photo/close-preteen-friends-park-smiling-600nw-735971812.jpg"
  ];
  
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
  };


  export default getRandomImage