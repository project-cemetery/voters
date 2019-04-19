# @solid-soda/voters

Security voters are the most granular way of checking permissions (e.g. "can this specific user edit the given item?").

In order to use voters, you have to understand how you can work with them. All voters are called each time you call `denyAccessUnlessGranted` method of `SecurityVotersUnity`.

Ultimately, `SecurityVotersUnity` takes the responses from all voters and makes the final decision (to allow or deny access to the resource) according to the strategy defined in the application, which can be: affirmative, consensus or unanimous.

## Instalation

`yarn add @solid-soda/voters`

## Basics

### Create Voter

A voter needs to implement `SecutiryVoter` interface.

Example: Suppose the logic to decide if a user can "view" a Post object is pretty complex. For example, a admin User can always view a Post. And if a Post is marked as "public", anyone can view it. A voter for this situation would look like this:

```js
class PostVoter {
  supports(attribute, subject) {
    return attribute === 'view' && subject instanceof Post
  }

  async voteOnAttribute(attribute, subject, token) {
    if (subject.public) {
      return true
    }

    return token.login === 'amdin'
  }
}
```
If you use TypeScript, you can import interface and implement it explicitly.

### Checking for Access

Create

```js
import { SecurityVotersUnity } from '@solid-soda/voters'

const unity = new SecurityVotersUnity(
  [ new MyVoter() ],
  Strategy.Affirmative,
  true,
)

// Post is a just class, does not matter
const post = new Post(1)

unity.denyAccessUnlessGranted('edit', post, { login: 'admin' })
```

The `denyAccessUnlessGranted` method calls out to the "voter" system. If system decline this action, `SecurityVotersUnity` will throw `VoterException`.

## Decision making

+ `SecurityVotersUnity` find all voters, which `supports` provided `attribute` and `subject`;
+ `SecurityVotersUnity` get answers from `voteOnAttribute` method for each voter;
+ `SecurityVotersUnity` apply to votes Strategy;
+ if all voters abstain from voting `SecurityVotersUnity` use `allowIfAllAbstain` parameter to make decision.

### Access Decision Strategy

Normally, only one voter will vote at any given time (the rest will "abstain", which means they return false from `supports`). But in theory, you could make multiple voters vote for one action and object. For instance, suppose you have one voter that checks if the user is a member of the site and a second one that checks if the user is older than 18.

To handle these cases, the access decision manager uses an access decision strategy. You can configure this to suit your needs. There are three strategies available:

+ `Strategy.Affirmative`, this grants access as soon as there is one voter granting access;
+ `Strategy.Consensus`, This grants access if there are more voters granting access than denying;
+ `Strategy.Unanimous`, this only grants access if there is no voter denying access.

If all voters abstained from voting, the decision is based on the `allowIfAllAbstain` config option (the third argument to the constructor).

In the above scenario, both voters should grant access in order to grant access to the user to read the post. In this case we should use `Strategy.Unanimous`. You can set this in the `SecurityVotersUnity` constructor:

```js
const unity = new SecurityVotersUnity(
  [ new MyVoter() ],
  Strategy.Unanimous,
  false,
)
```
