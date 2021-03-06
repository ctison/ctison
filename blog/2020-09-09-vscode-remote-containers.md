---
slug: vscode-remote-containers
title: VSCode Remote Containers
description: Learn how to connect VSCode to containers.
tags: [vscode, docker, devops]
---

Docker images are very useful because they are lightweight environments defined as code ([Dockerfiles](https://docs.docker.com/engine/reference/builder/)) where developers can set up the necessary tools and dependencies their softwares need to run. Then, other developers can simply download the docker images and run them on their desktop without the initial burden of setting up dependencies and understanding how things wire up at first.

<!--truncate-->

The primary use case of containers is to ship software to production, where a container orchestrator such as Kubernetes manages the lifecycle of containers (e.g. scaling containers on load).

The secondary use case of containers is in the process of developing and testing applications. The developers use derived images from production where they add the necessary tooling to develop and test their applications. It's huge because it reduces the environment frictions between developers and cloud environments: they share a similar environment and therefore they can easily share operational development processes as well (DevOps).

If you already have some experience with containers, you know that they are lightweight virtual machines accessible from your terminal. So to develop in a container, we can:

- Mount a repository in a container and open that repository locally in VSCode and run commands from a terminal connected to the container (e.g. to build, to trigger git hooks).
- Connect VSCode to a container so that it can directly access the container filesystem.

Connecting VSCode to a container has many advantages:

- Access the entire container's file system from VSCode.
- All dependencies and VSCode's integrations are installed in the container.
- Avoid bind mounting (aka. sharing) folders between your host and the container, which is a high-performance improvement when Docker is running in a Linux virtual machine (e.g. macOS, Windows) and when using tools with a lot of inputs/outputs (I/O) such as **npm** 🚜.

## Install

Let's start by installing the VSCode extension named **VSCode Remote - Containers**:

- [Docker for Desktop](https://www.docker.com/products/docker-desktop)
- [VSCode](https://code.visualstudio.com/)
- [Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Run a container

Once Docker is running, let's run a container with the following configuration:

- Created from [alpine](https://hub.docker.com/_/alpine).
- The container is named **work** and is in foreground mode (-it).
- The current working directory is bind mounted inside the container at **/work**.

```bash
docker run -it \
  --name work --hostname work \
  -v "$PWD:/work" --workdir /work \
  alpine
```

After running the last command, a shell prompt should appear, meaning you're now inside a container. You can run commands like:

- **uname -a** to display system information
- **ps aux** to view processes
- **mount** to reveal mounted filesystem
- **nslookup -type=a host.docker.internal** to [resolves the host](https://docs.docker.com/docker-for-mac/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host)

## Connect VSCode to a container

Now that we have a container running, we can use VSCode to connect to it:

- Open the **Command Palette** (F1)
- Select **Remote-Containers: Attach to Running Container...**
- Select the name of the container (e.g. **work**)

VSCode should open a new window with a progress bar showing the installation progress of its server inside the container. Once finished, that's it! We can now edit files inside our container with VSCode 🚀.

## Share development environments

We saw how to manually spawn a Docker container and connect to it through VSCode. But VSCode Remote Containers goes a bit further by allowing us to describe what container(s) should be created and connected to in a file named **.devcontainer.json**.
For example, to automate our previous example, create a folder named **gruntapp** with a file in it named **.devcontainer.json** with the following content:

```json
{
  "image": "ubuntu",
  "extensions": ["mutantdino.resourcemonitor"]
}
```

When opening the folder containing this file with VSCode, you should see a notification asking you whether or not to start developing in a container with the detected devcontainer file. Clicking **Reopen in Container** will create a container from **ubuntu** and mount the folder at **/workspaces/gruntapp**.
As a security measure, you should review a devcontainer file because it can run anything on your machine.

## Conclusion

We saw how VSCode containerize itself by installing its server into a container, while the frontend is on the host. It's a powerful tool to reduce developer frictions like dependencies management. This kind of practice will probably democratize and become a standard in the next decade 🔮.

Note that VSCode Remote Containers works with [docker compose](https://docs.docker.com/compose/) as well!

Happy coding 🤓

## Useful tips and tricks

## Docker volumes

We did both bind-mounting a repository to a container and connecting VSCode to the container. To gain performance improvements, you can instead put your code in the container (e.g. git clone, docker cp), or you can put your code in a Docker volume to persist your code across changing containers.

```bash
docker volume create example # create a volume named example
# run a container with the volume named example mounted at /example
docker run -it --rm -v example:/example -w /example alpine
# Inside the container, you can run `mount` to see the volume
echo '¯\_(ツ)_/¯' > x.txt
exit
# Start a ubuntu container
docker run -it --rm -v example:/example -w /example ubuntu
cat x.txt
```

### VSCode CLI

You can use **code** to open files from a terminal:

```bash
code file.txt
export EDITOR='code -w'
```

Setting VSCode as your shell editor is useful when using commands such as **git commit** and **kubectl edit**.

### Docker performances

Go to Docker preferences to allocate more CPU and RAM to your Docker VM.
On macOS, you can use the [delegated](https://docs.docker.com/docker-for-mac/osxfs-caching/) option to improve bind mount performances.

### Access host from a docker container

Docker for Desktop resolves by default [host.docker.internal](https://docs.docker.com/docker-for-mac/networking/#i-want-to-connect-from-a-container-to-a-service-on-the-host) to your host from inside a container. It means you can access a network service running on your host from a container. It also resolves _kubernetes.docker.internal_ if you enabled Kubernetes.

### Useful Links

- [VSCode Remote Containers](https://code.visualstudio.com/docs/remote/containers)
- [.devcontainer.json](https://code.visualstudio.com/docs/remote/devcontainerjson-reference)
- https://github.com/microsoft/vscode
- [Dockerfile](https://docs.docker.com/engine/reference/builder/)
- [Docker Compose](https://docs.docker.com/compose/compose-file/)
