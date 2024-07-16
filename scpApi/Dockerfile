# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copiar os arquivos do projeto e restaurar as dependências
COPY *.csproj .
RUN dotnet restore

# Copiar o restante dos arquivos e compilar o projeto
COPY . .
RUN dotnet publish -c Release -o out

# Etapa de runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out .

ENTRYPOINT ["dotnet", "WebServiceProjeto.dll"]
