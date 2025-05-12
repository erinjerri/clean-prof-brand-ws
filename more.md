Professional Brand Portfolio website and to-do list

# Professional Brand Portfolio Website
This is my clean website (work in progrss), with a is a fresh reinstall of rebrand using PayloadCMS, NextJS, ReactJS, Supabase, MongoDB, TailwindCSS written in TypeScript, JavaScript. 

I may plan a migration to S3 with AWS for faster rendering of assets in the future.

## Site Information Architecture - Block Layout Outline

### Screenshot of Site Mock (Hi-Fi)
![Alt text](https://github.com/erinjerri/pb-p-site/blob/main/April-2025-prof-brand-site-hifi-wireframe-figma-rz.png)

### Updated To-Do List v1 - Skeleton with Site Architecture

### Overview
| Page Name      | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| 0-Landing      | Entry page with CTA components and transition elements                     |
| 1-About        | Introduction page with 2-column CTA and footer                             |
| 2-Experience-Main | Display core experience with pagination and medium-impact components    |
| 3-Experience-Detail | Detailed view of individual experience projects                       |
| 4-Download     | Resource page with search tags and downloadable PDFs                      |
| 5-Read-Main    | Blog main page with blog card layout                                       |
| 6-Read-Detail  | Detailed blog post page with pagination and large title blocks            |
| 7-Watch-Main   | Video content page with category tags and various blog card styles        |
| 8-Watch-Detail | Detailed video page with pagination and large title blocks                |
| 9-Buy-Main     | Page showcasing books with CTA components                                 |
| 10-Buy-Detail  | Amazon Store Embed (future implementation)                                |

---

### Block Layouts by Page
#### 0-Landing
| Block Name               | Notes                        |
|--------------------------|------------------------------|
| Top-Nav-Block            | Global navigation component |
| Hero-CTA-Block           | Large call-to-action element|
| 2-Col-CTA-Block          | Medium impact layout        |
| CTA Large (1-col)        | Focused single-column block |
| 3-Col-CTA-Block          | Three-column layout         |
| Hero-Transition-Block    | Smooth transition visuals   |
| 2-Col-Text-Img-Block     | Text with corresponding images|
| Footer-Block             | Site-wide footer component  |

#### 1-About
| Block Name       | Notes                             |
|------------------|-----------------------------------|
| Top-Nav-Block    | Navigation block                 |
| 2-Col-CTA-Block  | Medium impact layout             |
| Footer-Block     | Footer component                 |

#### 2-Experience-Main
| Block Name           | Notes                           |
|----------------------|---------------------------------|
| Top-Nav-Block        | Navigation block               |
| 1-Col-Banner-Image   | Large image header             |
| Pagination           | Content pagination controls    |
| 3-Col-Medium-Impact  | Three-column medium layout     |
| Footer-Block         | Footer component               |

#### 3-Experience-Detail
| Block Name    | Notes                                |
|--------------|-------------------------------------|
| Top-Nav-Block | Navigation block                    |
| App-Large     | Large app-focused block, repeated   |
| Footer-Block  | Footer component                    |

#### 4-Download
| Block Name                | Notes                          |
|---------------------------|--------------------------------|
| Top-Nav                   | Navigation block              |
| Hero-Blog-Search-Tag      | Search functionality          |
| Blog-Card                 | Card layout for posts         |
| Footer-Block              | Footer component              |

#### 5-Read-Blog-Main
| Block Name                    | Notes                       |
|-------------------------------|----------------------------|
| Top-Nav                       | Navigation block           |
| Blog-Card                     | Blog layout cards          |
| 3-Col-Blog-Card-Horiz-Text    | Horizontal card layout     |
| Footer-Block                  | Footer component           |

#### 6-Read-Blog-Detail
| Block Name             | Notes                           |
|------------------------|---------------------------------|
| Top-Nav                | Navigation block               |
| 1-Col-Banner-Image     | Banner image header            |
| 1-Col-Title-Large      | Large title block              |
| Pagination             | Content pagination controls    |
| Footer-Block           | Footer component               |

#### 7-Watch-Main
| Block Name                    | Notes                        |
|-------------------------------|-----------------------------|
| Top-Nav                       | Navigation block            |
| Hero-1-Col                    | Large single-column block   |
| Feature-Video-Embed           | Video content integration   |
| Feature-Category-Tag-Search   | Category-based search tags  |
| 3-Col-Blog-Card               | Blog card layout            |
| 3-Col-Blog-Card-Horiz-Text    | Horizontal blog layout      |
| 3-Col-Blog-Card-No-Img        | Blog layout without images  |
| Footer-Block                  | Footer component            |

#### 8-Watch-Detail
| Block Name                    | Notes                        |
|-------------------------------|-----------------------------|
| Top-Nav                       | Navigation block            |
| Hero-1-Col                    | Large single-column block   |
| Feature-Video-Embed           | Video content integration   |
| Feature-Category-Tag-Search   | Category-based search tags  |
| Pagination                    | Content pagination controls |
| 1-Col-Title-Large             | Large title block           |
| Footer-Block                  | Footer component            |

#### 9-Buy-Main
| Block Name               | Notes                                |
|--------------------------|--------------------------------------|
| Top-Nav-Block            | Navigation block                    |
| 2-Col-Medium-Impact      | Medium impact layout                |
| CTA Large (1-col)        | Large call-to-action block          |
| Footer-Block             | Footer component                    |

---

## Updated To-Do List
Here’s the beautifully structured to-do list from earlier, formatted for easy reference:

### 1. PayloadCMS Admin Panel, Base Singletons
| Task                                                                                       | Status   |
|-------------------------------------------------------------------------------------------|----------|
| Create initial repo and configure environment variables with MongoDB, etc.                | ✅ Done   |
| Create initial CMS admin panel and page with blog main page and blog post detail          | ✅ Done   |
| Swapping out old assets with my new ones and creating new ones for main blog posts featured landing page         | ✅ Done   |
| Create main hero block                                                                     | 🔲 Pending |
| Feature pop-up modal with download PDF                                                    | 🔲 Pending |
| Add in media asset inline posting for Lexical                                         | 🔲 Pending |
| Add in site nav                                         | 🔲 Pending |
| Add in footer                                         | 🔲 Pending |
| Change UI - hex colors of buttons, regular and on hover                              | 🔲 Pending |
| Modify pagination to show numbers and arrows                                        | 🔲 Pending |



### 2. Base Components
| Task                                                                                       | Status   |
|-------------------------------------------------------------------------------------------|----------|
| Configure Supabase                                                                        | 🔲 Pending |
| Update remaining singletons - logo                                                       | 🔲 Pending |
| Customize collections per page                                                           | 🔲 Pending |
| Update landing animation with GSAP or Three.js                                           | 🔲 Pending |
| Test smoothness of load times and scrolling for parallax effects                         | 🔲 Pending |

### 3. Code Blocks Layout
| Task                                                                                       | Status   |
|-------------------------------------------------------------------------------------------|----------|
| Spin up new instance with environment variables from MongoDB, double-check DNS redirect   | 🔲 Pending |
| Update remaining singletons - pagination, button                                          | 🔲 Pending |
| Confirm real-time data loading in Supabase                                               | 🔲 Pending |
| Add progress bar with article length                                                     | 🔲 Pending |
| Perform browser testing                                                                   | 🔲 Pending |

### 4. Customized Features
| Task                                                                                       | Status   |
|-------------------------------------------------------------------------------------------|----------|
| Check for multi-tenant user compatibility across projects                                 | 🔲 Pending |
| Create hyperlinked directional UI arrows                                                 | 🔲 Pending |
| Customize hero block and hero video block                                                | 🔲 Pending |
| Implement feature search tags                                                            | 🔲 Pending |
| Cal.com Stripe Embed
| Test responsiveness across devices                                                       | 🔲 Pending |

### 5. Deployment and Testing
| Task                                                                                       | Status   |
|-------------------------------------------------------------------------------------------|----------| Resolve redirects with DNS for gen.xyz, GoDaddy and make sure it renders | 🔲 Pending | Validate smoothness of animations and ensure compatibility                               | 🔲 Pending |
| Conduct browser and multi-device compatibility tests                                     | 🔲 Pending |
| Test overall performance and scalability                                                 | 🔲 Pending |

### 5. Content 
| Task                                                                                       | Status   |
|-------------------------------------------------------------------------------------------|----------|
| Added CYRA - Creating Your Reality Agent page                                | 🔲 Pending |
| Add Download Page  | 🔲 Pending |
| Add Buy Page  | 🔲 Pending |
| Add Experiences Page  | 🔲 Pending |
| Add Experiences Detail  | 🔲 Pending |
| Add Watch Page  | 🔲 Pending |
| Add Watch Detail  | 🔲 Pending |
