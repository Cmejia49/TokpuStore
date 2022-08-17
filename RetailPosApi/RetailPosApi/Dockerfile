#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS base
RUN apt-get update \ 
    && apt-get install -y --no-install-recommends apt-utils libgdiplus libc6-dev libx11-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
RUN cd /usr/lib && ln -s libgdiplus.so gdiplus.dll
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["RetailPosApi.csproj", "./"]
RUN dotnet restore "RetailPosApi.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "RetailPosApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RetailPosApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RetailPosApi.dll"]