"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "genres",
      [
        {
          name: "Fantasy",
          category: "Fiction",
          description:
            "This genre features supernatural, mythological, or magical elements and characters.",
        },
        {
          name: "Science Fiction",
          category: "Fiction",
          description:
            "Science fiction explores futuristic and highly technological societies while dealing with classic themes and concepts while addressing big 'what if' questions.",
        },
        {
          name: "Dystopian",
          category: "Fiction",
          description:
            "These stories are set in a bleak, grim future often following a tragic event or disaster. The characters then face oppressive governments, technology gone bad, or environmental ruin in pursuit of cultural or social justice.",
        },
        {
          name: "Action & Adventure",
          category: "Fiction",
          description:
            "Action and adventure novels feature a main character on a quest to achieve an ultimate goal.\nThe protagonist encounters a series of high-stakes situations, and, by the end of their journey, they’ve overcome these challenges and undergone a personal transformation.",
        },
        {
          name: "Detective & Mystery",
          category: "Fiction",
          description:
            "This genre’s plots revolve around a crime or mystery that must be solved or foiled by the protagonist.\nWhile many genres include a mystery or a bit of detective work, this one features the solving of the crime as its main driving force.",
        },
        {
          name: "Thriller & Suspense",
          category: "Fiction",
          description:
            "Thriller and Suspense go hand in hand, including scary elements like Horror. However, the objective is to maintain tension until the resolution.\nWhile they involve elements similar to the Mystery genre, the protagonist primarily attempts to save their own life, or someone else’s, rather than solving a crime.",
        },
        {
          name: "Romance",
          category: "Fiction",
          description:
            "Love serves as the focal point of the plot in this book genre. While other plot elements may be present, the entire story develops the main character’s romantic relationship and usually ends happily.",
        },
        {
          name: "Horror",
          category: "Fiction",
          description:
            "The Horror genre relies on theme, plot, or setting to scare, startle, shock, and wreak discomfort and even revulsion until the hero defeats the threat.",
        },
        {
          name: "Historical Fiction",
          category: "Fiction",
          description:
            "This book genre is set in a specific time period, location, or around a specific historic event. The prose provides historically accurate details relevant to the period.\nWhile the plot may be based on an actual event, such as the Civil War, the characters and their actions are fictitious.",
        },
        {
          name: "Young Adult",
          category: "Fiction",
          description:
            "The Young Adult genre is fiction geared toward readers aged 13 to 17. YA often overlaps other genres, such as Fantasy or Dystopian with a coming-of-age storyline.",
        },
        {
          name: "Children's Fiction",
          category: "Fiction",
          description:
            "Whereas Young Adult caters to those 13 and above, Children’s Fiction is for readers aged 13 and below, and many subgenres comprise this category.",
        },
        {
          name: "Women's Fiction",
          category: "Fiction",
          description:
            "This book genre obviously targets a female readership and typically reflects upon the shared feminine experience or the growth of the female protagonist. This often pairs well with Contemporary Fiction or Romance.",
        },
        {
          name: "Contemporary Fiction",
          category: "Fiction",
          description:
            "This genre is so broad that it involves almost all genres set in the present.\nPlots revolve around a character’s everyday life such as work, politics, relationships, and the struggles of the modern era, but of course with challenges and twists intended to keep readers engaged.",
        },
        {
          name: "Literary Fiction",
          category: "Fiction",
          description:
            "Works of Literary Fiction are character-driven and introspective. They evoke deep thought through personal or social commentary on a particular theme.",
        },
        {
          name: "Graphic Novels",
          category: "Fiction",
          description:
            "Graphic Novels are defined not by their content but by their form. This genre is presented through narrative art with illustrations and typography in a panel layout like that of comic books, but have evolved into their own genre.\nThey can cover content as broad as memoirs, historical accounts, and adaptations of other media.",
        },
        {
          name: "Short Stories",
          category: "Fiction",
          description:
            "Collections of short stories, usually sharing a theme or narrative thread are self-explanatory.",
        },
        {
          name: "Memoir & Autobiography",
          category: "Non-Fiction",
          description:
            "These two types of nonfiction books fall under the same genre because, in both cases, the author also serves as the narrator.\nThe difference between a memoir and an autobiography is that an autobiography is a chronological account of the life of the narrator, while a memoir uses defining moments in one’s life to buttress a self-help theme.",
        },
        {
          name: "Bigraphy",
          category: "Non-Fiction",
          description:
            "Biographies tell the story of the life of a notable person, most often someone well known or anyone whose story teaches valuable life lessons.\nThese differ from autobiographies in that they are written in third-person by someone else, rather than by the subject in first-person.",
        },
        {
          name: "History",
          category: "Non-Fiction",
          description:
            "This genre aims to educate and entertain the reader by chronicling a historical event.",
        },
        {
          name: "Food & Dring",
          category: "Non-Fiction",
          description:
            "Food and drink is one of nonfiction’s hottest markets as its titles cater to a variety of diets, lifestyles, and cultural cuisines. Photographs often accompany recipes and personal stories for food lovers.",
        },
        {
          name: "Poetry",
          category: "Non-Fiction",
          description:
            "Often organized into collections or anthologies, this genre includes free verse, rhymed verse, and a variety of other types of poetic expression.",
        },
        {
          name: "Self-Help",
          category: "Non-Fiction",
          description:
            "This book genre is devoted to empowering readers to realize their potential so they can become the best version of themselves.",
        },
        {
          name: "True Crime",
          category: "Non-Fiction",
          description:
            "True Crime books examine real crimes and events, usually with alarming detail. Many books in this genre focus on infamous murders, kidnappings, or other felonies.",
        },
        {
          name: "Travel",
          category: "Non-Fiction",
          description:
            "These books take readers all over the world, featuring reviews, budgeting tips, travel hacks, and advice on where to eat and what to see.",
        },
        {
          name: "Art & Photography",
          category: "Non-Fiction",
          description:
            "This genre is home to books that showcase an artist’s work, a specific style of art, or the history of art.",
        },
        {
          name: "Essays",
          category: "Non-Fiction",
          description:
            "This genre often follows a unifying theme. These essays—or speeches transcribed—cover the writer’s personal experiences, usually told in the first person.",
        },
        {
          name: "Humanities & Social Sciences",
          category: "Non-Fiction",
          description:
            "This academic genre explores issues related to social sciences such as psychology, sociology, philosophy, language, religion, or music.",
        },
        {
          name: "Science & Technology",
          category: "Non-Fiction",
          description:
            "Books in this genre delve into current scientific and technological developments from technology such as Artificial Intelligence and coding to medical research.",
        },
      ],
      { ignoreDuplicates: true }
    );
    await queryInterface.bulkInsert(
      "authors",
      [
        {
          name: "Karin Slaughter",
          bio: "Karin Slaughter is an American crime writer. She has written 24 novels, which have sold more than 40 million copies and have been published in 120 countries. Her first novel, Blindsighted, was published in 27 languages and made the Crime Writers' Association's Dagger Award shortlist for 'Best Thriller Debut' of 2001.",
        },
        {
          name: "Paul Johnston",
          bio: "Born and brought up in Edinburgh, Paul Johnston studied ancient and modern Greek at Oxford and now divides his time between Scotland and Greece. As well as four previous Alex Mavros novels, he is the author of the award-winning Quint and Matt Wells crime series.",
        },
        {
          name: "Michael Connelly",
          bio: "Michael Joseph Connelly (born July 21, 1956) is an American author of detective novels and other crime fiction, notably those featuring LAPD Detective Hieronymus Harry Bosch and criminal defense attorney Mickey Haller.",
        },
        {
          name: "Patricia Cornwell",
          bio: "Patricia Cornwell is an American crime writer known for her charismatic forensic examiner Dr Kay Scarpetta. She sold her first novel, Postmortem, while working at the Office of the Chief Medical Examiner in Richmond, Virginia. The Scarpetta series has since become an international phenomenon, selling over 100 million copies.",
        },
        {
          name: "Niall Williams",
          bio: "Niall Williams is an Irish writer. Having started as a non-fiction writer and playwright, he is most well-known as a novelist. Niall’s first novel was FOUR LETTERS OF LOVE. Published in 1997, it went on to become an international bestseller and has since been published in over twenty countries.",
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("genres", null, {});
    await queryInterface.bulkDelete("authors", null, {});
  },
};
