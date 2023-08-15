-- Poner aquí el código SQL
CREATE TABLE cargos(
	CodCar INT(99) PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Nombre VARCHAR(45)
);

CREATE TABLE nomina(
	CodEmp INT(99) PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Nombres VARCHAR(45),
    Apellidos VARCHAR(45),
    Salario VARCHAR(45),
    Fecha_ingreso DATE,
    PhotoUrl VARCHAR(45),
    CodCar INT(99),
    CodSuc INT(99)
);

ALTER TABLE nomina ADD CONSTRAINT fk_cargos FOREIGN KEY (CodCar) REFERENCES Cargos(CodCar);

CREATE TABLE sucursales(
	CodSuc INT(99) PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Direccion VARCHAR(45),
    Latitud VARCHAR(45),
    Longitud VARCHAR(45)
    );

ALTER TABLE nomina ADD CONSTRAINT fk_sucursales FOREIGN KEY (CodSuc) REFERENCES sucursales(CodSuc);

   CREATE TABLE categorias(
	  CodCat INT(99) PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Nombre VARCHAR(45)
);

    CREATE TABLE productos(
	CodPro INT(99) PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Nombre VARCHAR(45),
    Descripcion VARCHAR(45),
    Precio VARCHAR(45),
    CodCat INT(99)
);

ALTER TABLE productos ADD CONSTRAINT fk_categorias FOREIGN KEY (CodCat) REFERENCES categorias(CodCat);

  CREATE TABLE ingredientes(
	CodIng INT(99) PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Nombre VARCHAR(45)
);

 CREATE TABLE proveedores (
	CodProv INT(99) PRIMARY KEY AUTO_INCREMENT UNIQUE,
    Nombre VARCHAR(45),
    Nit VARCHAR(45)
);

CREATE TABLE prod_has_ingr (
  CodPro INT(99),
  CodIng INT(99),
  FOREIGN KEY (CodPro) REFERENCES productos(CodPro),
  FOREIGN KEY (CodIng) REFERENCES ingredientes(CodIng)
);

CREATE TABLE  prov_has_ingr (
  CodIng INT(99),
  CodProv INT(99),
  FOREIGN KEY (CodProv) REFERENCES proveedores(CodProv),
  FOREIGN KEY (CodIng) REFERENCES ingredientes(CodIng)
);
