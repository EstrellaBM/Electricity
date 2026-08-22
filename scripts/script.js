const popup = document.querySelector("#popup_profile");
const popupCard = document.querySelector("#popup_card");
const userInfoEdit = document.querySelector(".user_info_edit");
const cardInfoEdit = document.querySelector(".btn_buscar_personaje");
const popupClose = document.querySelector("#popup_close_profile");
const popupCloseCard = document.querySelector("#popup_close_card");
const card_template = document.querySelector("#card-template");
const container = document.querySelector(".card_container");
const formName = document.querySelector(".form_name");
const formDespcription = document.querySelector(".form_description");
const userInfoName = document.querySelector(".user_info_name");
const userInfoDescription = document.querySelector(".user_info_description");
const form = document.querySelector("#form_profile");

const formCardInputs = document.querySelectorAll(".form_card__input");

const formChar = document.querySelector("#form_card");

const data = [
  {
    title: "Jiyoung Yoo",
    link: "./images/Jiyoung Yoo.jpg",
    mirrorLink: "./images/jiyoung yoo-mirror.jpg",
    description: "Poder: Control de viento",
  },
  {
    title: "Kayden Break",
    link: "./images/Kayden Break.jpg",
    mirrorLink: "./images/kayden-mirror.jpg",
    description: "Poder: Control de la electricidad",
  },
  {
    title: "Gatella",
    link: "./images/Gastella.jpg",
    mirrorLink: "./images/Gastella-mirror.jpg",
    description: "Poder: Absorbe la energia vital",
  },
  {
    title: "Kartein",
    link: "./images/Kartein .jpg",
    mirrorLink: "./images/kartein-mirror.jpg",
    description: "Poder: Curacion",
  },
];

const setInitialProfileValues = () => {
  if (data.length > 0) {
    const primeraTarjeta = data[0];
    formName.value = primeraTarjeta.title;
    formDespcription.value = primeraTarjeta.description;
  }
};

const createCard = (personaje) => {
  const card = card_template.content.cloneNode(true);
  const cardElement = card.querySelector(".card");
  const cardTitle = card.querySelector(".card_title");
  const cardImageFront = card.querySelector(".card_image--front");
  const cardImageMirror = card.querySelector(".card_image--mirror");
  const cardDescription = card.querySelector(".card_description");
  const cardLikeButton = card.querySelector(".card_like_button");
  const cardDislikeButton = card.querySelector(".card_dislike_button");

  cardTitle.textContent = personaje.title;
  cardImageFront.src = personaje.link;
  cardImageFront.alt = personaje.title;
  cardImageMirror.src = personaje.mirrorLink || personaje.link;
  cardImageMirror.alt = personaje.title;
  cardDescription.textContent = personaje.description;

  cardElement.addEventListener("click", () => {
    cardElement.classList.toggle("card--flipped");
  });

  cardLikeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("Like:", cardTitle.textContent);
  });

  cardDislikeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("Dislike:", cardTitle.textContent);
  });

  container.prepend(card);
};

data.forEach((personaje) => {
  createCard(personaje);
});

setInitialProfileValues();

userInfoEdit.addEventListener("click", () => {
  setInitialProfileValues();
  popup.classList.toggle("popup_open");
  console.log("ola");
});

cardInfoEdit.addEventListener("click", () => {
  popupCard.classList.toggle("popup_open");
  console.log("ola");
});

popupClose.addEventListener("click", () => {
  popup.classList.toggle("popup_open");
  console.log("boton de cerrar usuario");
});

popupCloseCard.addEventListener("click", () => {
  popupCard.classList.toggle("popup_open");
  console.log("boton de cerrar tarjeta");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameVal = formName.value.trim();
  const descVal = formDespcription.value.trim();

  let defaultName = "Jiwoo";
  let defaultDesc = "Poder: Electricidad";

  if (data.length > 0) {
    defaultName = data[0].title;
    defaultDesc = data[0].description;
  }

  if (nameVal === "") {
    userInfoName.textContent = defaultName;
  } else {
    userInfoName.textContent = nameVal;
  }

  if (descVal === "") {
    userInfoDescription.textContent = defaultDesc;
  } else {
    userInfoDescription.textContent = descVal;
  }

  form.reset();
  popup.classList.remove("popup_open");
});

formChar.addEventListener("submit", (e) => {
  e.preventDefault();

  const card = {};

  formCardInputs.forEach((formCardInput) => {
    card[formCardInput.name] = formCardInput.value;
  });

  console.log(card);

  data.push(card);
  createCard(card);
  console.log(data);

  formChar.reset();
  popupCard.classList.remove("popup_open");
});
