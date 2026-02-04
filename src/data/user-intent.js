import getImage from "../utils/imageUtils";


export const intentOptions = [
    {
        id: "COUPLE",
        emoji: "❤️",
        title: "Couple Dining",
        subtitle: "Romantic table for two",
        image: getImage("romantic-table.jpg"),
    },
    {
        id: "FRIENDS",
        emoji: "🎉",
        title: "Friends & Party",
        subtitle: "Group gatherings & celebrations",
        image: getImage("friends-party.jpg")
    },
    {
        id: "SNACKS",
        emoji: "☕",
        title: "Snacks & Coffee",
        subtitle: "Quick bites & beverages",
        image: getImage("snacks-coffee.jpg")
    },
    {
        id: "BREAKFAST",
        emoji: "🍱",
        title: "Breakfast / Lunch",
        subtitle: "Morning & midday meals",
        image: getImage("breakfast-lunch.jpg")
    },
    {
        id: "TAKEAWAY",
        emoji: "🥡",
        title: "Takeaway",
        subtitle: "Order to go",
        image: getImage("takeaway-food.jpg")
    },
    {
        id: "WEDDING",
        emoji: "💒",
        title: "Wedding",
        subtitle: "Special occasions & celebrations",
        image: getImage("wedding-party.jpg")
    },
];