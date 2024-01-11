## Rebuilding Reddit
This is a NextJS website that attempts to create as through as possible an archive of reddit. It accomplishes this by creating a convenient way to view all the content from Pushift's archives of Reddit's comments and submissions over the years.

## Long Term Goals
- [ ] Create and publish an updated list of all subreddits ever, Watchful1 has a great list, but it only goes up to 2022 and includes user profile subreddits (those beginning with r/u_ which aren't really needed 
- [ ] Switch the database being used from MongoDB to PostgreSQL, its not an issue right now but anyone who want to actually use ALL of Reddit's data will inevitably run into a major database bottleneck
- [ ] Rebuild Imgur using [Archive Team's Backups](https://archive.org/details/archiveteam_imgur) so that most image posts on reddit will be viewable. This sounds pretty ambitious, but schema analysis indicates ~20% of all reddit posts used an imgur image so it is very important to try eventually even though the storage requierements will likely be insane.
