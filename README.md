# Análisis Práctica 2 LT
La práctica consiste en desarrollar un sofware que a dados unos parámetros de red nos devuelva la mejor arquitectura del sistema.

## Entregables
- Código completo de la herramienta (Comentado y con la autoría de cada parte)
  - Comentario descriptivo a cada variable
  - Se debe comentar la cabecera de todas las funciones (ejemplo de una fucnción BIEN comentada)  ↓↓↓↓↓↓↓↓↓↓

```python
def area_circulo(radio):
    """
    Función que calcula el área de un círculo dado su radio.

    Argumentos:
    radio (float): El radio del círculo.

    Retorna:
    float: El área del círculo.

    Ejemplo de uso:
    >>> area_circulo(5)
    78.53981633974483
    """

    # Cálculo del área usando la fórmula A = π * radio^2
    import math
    return math.pi * radio**2

# Llamada a la función para calcular el área del círculo
area_c = area_circulo(radio_circulo)

# Imprimir el resultado
print(f"Área del círculo: {area_c:.2f} metros cuadrados")
```

- Un diagrama de flujo del programa (El de abajo es de ejemplo)

<img src="./images/diagrama.png" width="500"></img>

- Documentos de la aequitectura del servicio Backend desplegado **(No sé qué es esto)**
- Tabla del % de esfuerzo de cada uno.

## Evaluacion
- Demostración del funcionamiento
  - Verificación de datos (La haremos en el frotend)
  - Excepciones (Se han de incluir en las funciones del backend y motrar un aviso en el frontend)

- Modularidad: por ejemplo, poder añadir un códec (Usaremos archivoc .json como base de datos)
- Claridad de la interfaz y usabilidad (Esto es lo que pretenden el diseño UX/UI)



## Frontend
En nuestro caso vamos a hacer el frontend em HTML y CSS por lo que se va a ejecutar desde el navegador y se va a llamar a las funciones de Python desde allí.

#### Tareas a realizar
- Diseño UX (Pensar como va a ser la interacción con el sofware)
  - Como van a estar distribuidos los datos en la interfaz (Ventanas, desplegables, sliders, etc...).
  - El diseño debe pedir la elección de las variables de las tablas MOS y el retardo.
  - Avisar al usuario si faltan datos para calcular.
- Diseño UI (Hacerlo bonito)
- Implementación en Código

## Backend
Aquí es donde está el meollo, pero por suerte es bastante mecánico. La forma de trabajar va a ser que cada uno se le asignan una cantidad de funciones a desarrollar que han de necesitar por parámetros los datos mínimosm posibles para el cálculo y dar como salida el resultado en Float.

#### Parámetros del backend:
- Introducidos por el usuario
  - MOS_objetivo (Mean Opinion Score)
  - RT (Retardo Total)
  - J **No estoy seguro**
  - PB (Probabilidad de Bloqueo)**No estoy seguro**
  - precio_max_BWst (Precio máximo dispuesto a pagar por llamada)
  - NC (Numero de clientes)
  - N_l (Numero de lineas por cliente)
  - T_ll (Tiempo de llamada por cliente)
  - P_ll (Probabilidad de llamada en la BHT)

- Dados por el códec
  - CSS_codec_x
  - CSI_codec_x
  - MOS_codec_x
  - VPS_codec_x
  - PPS_codec_x
  - BW_RTP_codec_x
  - BW_cRTP_codec_x
  - BW_eth_codec_x

- Constantes
  - BWres = 1.1 x Bwll
  - retardo_buffer = 2 x J
  - tamano_buffer = 2 x retardo_buffer

- Calculados
  - bwll (Ancho de banda de cada llamada)
  - bwst (Ancho de banda de llamada +QOS)
  - precio_BWst (Precio por llamada)
  - max_llamada (Numerom maximo de llamadas que se pueden cursar)

## Funcionamiento de la aplicación
Estructura de carpetas de la aplicación

```
calculadora_voIP/
├── README.md
├── backend/
│   ├── main.py
│   ├── funcion_1.py
│   └── funcion_2.py
│   .
│   . 
│   .
│   └── funcion_x.py
│
├── frontend/
│   └── frontend.html
│
└── data/
    ├── codecs.json
    └── other.json

```

Esbozo MUY POR ENCIMA de la interfaz

<img src="./images/esbozo_UI.png"></img>

**ESTO ES UN ESBOZO Y NO UNAS INSTRUCCIONES, NO INCLUYE TODOS LOS CASOS POSIBLES NI ESTÁ PENSADA AL 100%**

- Primer paso: elegir códec que cumpla el MOS dado. Nos quedamos con un array con el MOS de todos los códec. La información la extraemos de un [JSON con Python](https://www.geeksforgeeks.org/read-json-file-using-python/). 

```python
def elegir_codecs(MOS_objetivo)
  ### Codigo de la función ##
  return array_codecs_posibles
```


- Calcular retardos del códec, leeremos la información del JSON con los códecs. **ESTO ES SOLO UN EJEMPLO, PROBABLEMENTE SEA MEJOR SEPARAR LOS CÁLCULOS EN VARIAS FUNCIONES, ESO YA LO VEMOS**
```python
def calcular_retardos_codec(array_codecs_posibles)
  # La información del codec x se obtendrá de un archivo json
  ## Cálculos pertinentes ##

  #La idea es devolver una matriz o un objeto con todos los retardos para todos los códec posibles
  return matriz_retardos_codecs
``` 

- Calcular los retardos en destino. **Tener en cuenta el peor caso**
```python
def calcular_buffer(jitter)
  ## Cálculos pertinentes ##
  return retardo_buffer, tamano_buffer
```

- Busy Hour traffic

```python
def calcular_erlang(PB,N_l)
  ## Cálculos pertinentes ##
  return erlangs
```

- Cálculo ancho de banda

```python
def calcular_BW(N_ll,BW_ll,BW_res)
  ## Cálculos pertinentes
  return BW_st
```

## TCP RAW
Este tío se vino fleje arriba con esto, hay que ver como se hace, no creo que sea complicado, se hace con Python en el backend, tengo que estudiar como se puede hacer eso y conectarlo con el frontend.

Un socket raw (o socket sin procesar) es un tipo especial de socket que permite a las aplicaciones acceder directamente a las capas inferiores del modelo OSI, como la capa de red (capa 3) y la capa de enlace de datos (capa 2). Esto permite la creación y envío de paquetes personalizados, incluyendo encabezados de protocolos como IP y TCP. Permite implementar protocolos de red personalizados o realizar análisis detallados del tráfico de red. 
BAELDUNG

En el contexto de TCP, un socket raw permite la construcción manual de paquetes TCP/IP, proporcionando control total sobre los campos del encabezado TCP, como los números de secuencia, los números de acuse de recibo y las banderas de control. Esto es útil para tareas como la creación de herramientas de escaneo de puertos, análisis de tráfico o pruebas de seguridad. 
BINARY TIDES

Es importante destacar que el uso de sockets raw generalmente requiere privilegios elevados en el sistema operativo, debido a los riesgos asociados con su uso indebido. Además, su disponibilidad y funcionalidad pueden variar según el sistema operativo. 
MICROSOFT

Fuentes:
- [Baeldung - Raw Sockets](https://www.baeldung.com/cs/raw-sockets)
- [BinaryTides - Raw Sockets using Winsock](https://www.binarytides.com/raw-sockets-using-winsock/)
- [Microsoft - TCP/IP Raw Sockets](https://learn.microsoft.com/es-es/windows/win32/winsock/tcp-ip-raw-sockets-2)


## Cosas a tener en cuenta
#### Código
No usar tildes "´", ni eñes "ñ" ni espacios. Para los nombres de las variables usaremos la convención "[Snake Case](https://www.pluralsight.com/resources/blog/software-development/programming-naming-conventions-explained#:~:text=Snake%20Case,-Snek%3A%20If%20you&text=snake_case%20is%20a%20variable%20naming,database%20table%20and%20column%20names.)" para nombrar las variables, esto significa TODO MINÚSCULAS (menos las siglas) y las palabras separadas por barras bajas.

```python
esto_es_un_ejemplo = 3 #Separadas por barras bajas
altura_leon = 120 #Sin tildes
ano_actual = 2024 #Sin ñ
```

#### Organización
Somos muychos así que tenemos que seguir un orden y una jerarquía. Para organizar las tareas, lo haremos a través de [ClikUp](https://clickup.com/), que es una herramienta profesional, pero a la vez sencilla si no te quieres complicar.

Alojaré el código en [GitHub](https://github.com/) para que siempre puedan tener la última versión completa disponible.

Para compartir código mientras trabajan lo mejor es  [CodeShare](https://codeshare.io/). Par compartirse codigo, que uno lo copie, el otro lo cambie, etc...




