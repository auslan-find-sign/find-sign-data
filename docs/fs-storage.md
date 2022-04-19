## How data is stored

Currently, the app has the concept of 'collections'. Collections are folders
within `data/collections`. Inside these folders, folders and files can be uploaded
with a few restrictions. Filenames cannot contain `\`, `/`, and cannot begin with
`.` or `#`. Collection names must be 128 chars or fewer. Paths within collections
cannot exceed 512 characters in total length.

`.` prefix is disallowed because it's confusing. `#` prefix is reserved for system
files. All other files and folders are considered collection data.

## System files

The root of a collection can contain a few optional files:

### `#README.md`

A readme file, presented on the homepage, in markdown.

### `#keys.json`

A JSON object, where the property names are hex encoded public keys, and the values are
a string with a label for the person/app the key belongs to.

Keys are to be tweetnacl sign publickeys, which are 32 bytes (64 chars) long.

### `#private`

If this empty file exists, the collection is considered private, in which case it is
only readable by users with one of the keys in the keys.json file. If this file is
absent, the collection is considered public and read access is available to any web user.

### `#assets` folder

If this folder exists, it is publically available for rendering readme contents.
It might contain images for example.