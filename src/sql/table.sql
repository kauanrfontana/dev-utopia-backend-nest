
CREATE DATABASE devutopia;

USE devutopia;

CREATE TABLE [users](
[id] int IDENTITY(1, 1) PRIMARY KEY,
[name] varchar(100) NOT NULL,
[email] varchar(200) UNIQUE NOT NULL,
[password] varchar(200) NOT NULL,
[created_at] datetime NOT NULL,
[state_id] int,
[city_id] int,
[address] varchar(200),
[house_number] varchar(20),
[complement] varchar(200),
[zip_code] varchar(8)
[role_id] int NOT NULL,
FOREIGN KEY ([role_id]) REFERENCES [roles]([id]),
);

CREATE TABLE [roles](
[id] int IDENTITY(1,1) PRIMARY KEY,
[category] int NOT NULL,
[name] varchar(50) NOT NULL,
[created_at] datetime NOT NULL
);

CREATE TABLE [products](
[id] int IDENTITY(1,1) PRIMARY KEY,
[user_id] int NOT NULL,
[name] varchar(200) NOT NULL,
[url_image] varchar(500),
[description] varchar(400),
[created_at] datetime NOT NULL,
[price] money NOT NULL,
[state_id] int NOT NULL,
[city_id] int NOT NULL,
[address] varchar(200) NOT NULL,
[house_number] varchar(5) NOT NULL,
[complement] varchar(200),
[zip_code] varchar(8) NOT NULL,
FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
);

CREATE TABLE [shopping_carts](
[id] int IDENTITY(1,1) PRIMARY KEY,
[user_id] int NOT NULL,
FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
);

CREATE TABLE [shopping_cart_products](
	shopping_cart_id int NOT NULL,
	product_id int NOT NULL
	FOREIGN KEY (shopping_cart_id) REFERENCES shopping_carts(id),
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE [tokens] (
[user_id] INT NOT NULL PRIMARY KEY,
[token] VARCHAR(1000) NOT NULL,
[refresh_token] VARCHAR(1000) NOT NULL,
[expired_at] datetime NOT NULL,
FOREIGN KEY ([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE
);

CREATE TABLE [purchased_items](
[id] int IDENTITY(1, 1) PRIMARY KEY,
[user_id] int NOT NULL,
[product_id] int NOT NULL,
[purchase_date] datetime NOT NULL,
FOREIGN KEY([user_id]) REFERENCES [users]([id]) ON DELETE CASCADE,
FOREIGN KEY([product_id]) REFERENCES [products]([id]) ON DELETE CASCADE
);

CREATE TABLE [product_reviews](
[id] int IDENTITY(1,1) PRIMARY KEY,
[stars] smallint NOT NULL,
[review] varchar(500) NOT NULL,
[product_id] int NOT NULL,
[user_id] int NOT NULL,
[created_at] datetime NOT NULL,
[updated_at] datetime,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Via sql server ao tentar criar uma tabela com duas colunas de DELETE CASCADE ele gera um erro, para resolver isso pode ser criado uma trigger,
-- ou apenas criar a tabela sem uma dos DELETE CASCADE, e editar a tabela pela interface do SQL Server.
-- caminho: SQL Server Management Studio -> Databases -> Tables -> Keys -> Botão direito na Chave Estrangeira que está sem o CASCADE -> Modify -> Na janela aberta vá em Table Designer -> Expanda a linha INSERT And UPDATE Specification -> Em DELETE Rule selecione CASCADE -> Close -> Feche a janela e salve.