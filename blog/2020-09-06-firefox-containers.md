---
slug: firefox-containers
title: 🔥🦊 Firefox Containers
description: Learn how to use Firefox containers to enhance your browsing experience and security.
tags: [firefox, web, security, privacy, productivity, seo]
---

Firefox containers allows us to navigate the web from multiple browsing sessions in a single window. They unlock functionalities like:

- Authenticate with multiple accounts on a website (e.g. Facebook).
- Perform search queries (e.g. Google) in clean states where previous searches don't influence other searches.
- Prevent potentials CSRF attacks and other types of vulnerabilities because your credentials are segregated by containers.

To unlock these functionalities, we will use **Multi-Account Containers** which is a Firefox extension that allows us to use tabs in different browsing sessions, called containers, where data are isolated from one another. Let's go!

<!--truncate-->

# Containers

The first step is to install **Multi-Account Containers**:

https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/

Once installed, click on **Multi-Account Containers** icon on the top right.

![Multi-Account Containers menu](https://dev-to-uploads.s3.amazonaws.com/i/wjc659wk4u3aqkjm5sah.png)

A menu should appear with preexisting containers. When clicking on one of them, a new tab opens, and you should see two things:

- A thin colored border on the bottom of your tab.
- The name and icon of your container in the right of the search bar.

![Containerized tab](https://dev-to-uploads.s3.amazonaws.com/i/nhiw5u5chi0wfz5ienmw.png)

Those two things mean you're browsing in a container. You can assert that it is true by authenticating to Facebook in one container and check that you're not authenticated in another.

You're now able to browse websites with multiple identities 🦾🚀🔥!

But there is more.

# Temporary Containers

Browsing in multiple containers allows you to browse websites with multiple identities, which is fantastic. But we could use this technology moreover by automatically spawning and dropping containers while navigating the web, thus increasing our security and privacy. Think about a new container every time you want to interact with servers on the internet.

To do this, install **Temporary Containers** from:
https://addons.mozilla.org/en-US/firefox/addon/temporary-containers/

By default, **Temporary Containers** is in a passive mode and opens a new container when clicked. This new container is temporary and will be deleted (along with the data it contains) when no longer used by a tab for a certain amount of time (15 minutes by default).

![Containerized tab](https://dev-to-uploads.s3.amazonaws.com/i/d2frv12r7jmrc346ic7s.png)

**Temporary Containers** has a lot of options to configure to enjoy its power, and thankfully, it supports exporting and importing configurations, so you can download mine from [temporary-containers-preferences.json](https://raw.githubusercontent.com/ctison/config/master/firefox/temporary-containers/preferences.json) and install it seamlessly. You can then go to **Temporary Containers** import settings by right-clicking on it, then:

**Manage Extension > ... > Preferences > Export/Import**

![Temporary Containers' preferences link](https://dev-to-uploads.s3.amazonaws.com/i/56dwb6blfefpud82a1pt.png)

![Temporary Containers' import/export menu](https://dev-to-uploads.s3.amazonaws.com/i/9p0y2ttus9b808lthn5s.png)

In my configuration, **Temporary Containers** will create a temporary container in the following cases:

- You navigate in a newly opened tab
- You navigate to an URL that has a different domain or subdomain from the current one. For example, going from [google.com](https://google.com) to [facebook.com](https://facebook.com).

# Permanent Containers

Now that we have temporary containers spawning by default, we have to learn how to bypass them because sometimes we need to share data between websites. For example, some websites propose to authenticate via a third party account like [google.com](https://google.com) or [linkedin.com](https://linkedin.com), but navigating from [example.org](https://example.org) to [google.com](https://google.com) would create another temporary container isolated from the previous. So we need to create permanent containers, where cross-domains navigation doesn't spawn distinct containers, and which are not automatically deleted.

So let's create a container with **Multi-Account Containers** named, for example, _Google_. Once done, click on **Temporary Containers** and make a container "permanent" by selecting its name in **Exclude Permanent Containers**.

![Temporary Containers's exclude permanent containers menu](https://dev-to-uploads.s3.amazonaws.com/i/wrx1tqyhvd8kqaqxfryc.png)

Now, anything you do in this container will persist, and cross-domains navigation will not spawn new containers.

# Tips

- Open a new tab in the same container by pressing **Alt+X**!
- Right-click on a tab or a link to see containers related options.
- Long click on the **Create tab** button to open a new tab in a specific container.

![Create a containerized tab's menu](https://dev-to-uploads.s3.amazonaws.com/i/uxbkv4x55hzubbevyaqq.png)

# Conclusion

That's it! You are now completely undetectable... 🤨
Maybe not entirely, but still, we made some progress 🐥.

Note that this style of navigation may introduce irritating website behaviors that require some knowledge to neutralize. Don't worry; I will talk about these measures in the next post. In the meantime, you can reset **Temporary Containers** settings by going to **Advanced > General > Reset Storage**.

The next post of this series will talk about how to block and bypass annoying content from the web with some of the following extensions:

- uBlock Origin
- Stylus
- Greasemonkey
- Cookie Quick Manager

Happy browsing 😀👀
