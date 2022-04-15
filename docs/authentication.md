## Authentication (for writes/private collection reads)

Authentication is achieved by showing a license to the server with your request.
This license can be submitted using either a query string parameter `license=...`
or by using http basic auth where the username is 'license' and the password
is the encoded license value.

Licenses are signed with ed25519 using tweetnacl's nacl.sign function.

The license is a string, with three parts:

1. the string 'ed25519'
2. the user's publicKey, hex encoded (64 bytes)
3. the output of `nacl.sign(message, secretKey)`, hex encoded

These are joined with a `-` seperator.

## message

Message is two timestamps, as whole integer strings, joined by `-` seperator.
The timestamps are in standard javascript epoch millisecond format. The first
timestamp represents the earliest time the license is valid, and the last
timestamp is the latest time the license is valid. This limits the viable
duration of replay attacks.

Implementations should consider that their local clock may not precisely align
with the server. A reasonable choice could be to set the start time to 30
seconds behind current time, and the end time to 30 seconds ahead of current
time. If doing large uploads over a slow connection, a longer expiry maybe
desirable. If including the license in a html form action, a reasonable expiry
maybe hours or even days in to the future.

## validity

A license is valid to access a collection if the collection contains a `#keys.json`
file and the license signature validates against one of the contained keys,
as well as the current system time when the request is processed, being within
the signed values.