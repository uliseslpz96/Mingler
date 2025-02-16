import 'package:flutter/material.dart';
import '../widgets/post_widget.dart';

import 'dart:math';

class NewsScreen extends StatefulWidget {
  const NewsScreen({super.key});

  @override
  _NewsScreenState createState() => _NewsScreenState();
}

class _NewsScreenState extends State<NewsScreen> {
  String _selectedButton = 'Cerca de mí';
  String _selectedLocation = 'Cerca de mí';
  IconData _selectedLocationIcon = Icons.location_on_rounded;
  bool _isLocationButtonActive = true;

  final Map<String, IconData> _locationIcons = {
    'Muy cerca': Icons.my_location_rounded,
    'Cerca de mí': Icons.location_on_rounded,
    'Algo lejos': Icons.location_city_rounded,
    // 'Explorar': Icons.travel_explore_rounded,
    // 'Seguidos': Icons.groups
  };

  List<Map<String, dynamic>> _currentPosts = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadPosts(_selectedLocation); // Cargar posts iniciales
  }

  // Simular una consulta a una API
  Future<List<Map<String, dynamic>>> _fetchPosts(String location) async {
    print("Se está consultando la información...");
    final random = Random(); // Crear una instancia de Random
    final delay =
        random.nextInt(2000); // Generar un número aleatorio entre 0 y 2000

    await Future.delayed(Duration(milliseconds: delay)); // Retraso aleatorio

    final Map<String, List<Map<String, dynamic>>> postsByLocation = {
      'Muy cerca': List.generate(20, (index) {
        return _createPost(
          id: index + 1, // ID consecutivo a partir de 1
          username: "@usuario${index + 1}", // Usuario único
          timeAgo: "Hace ${Random().nextInt(120)} minutos", // Tiempo aleatorio
          content: "Contenido del post ${index + 1}", // Contenido único
          imageUrls: [
            "https://picsum.photos/600/400?random=$index"
          ], // Imagen única
          profileImageUrl:
              "https://randomuser.me/api/portraits/men/${Random().nextInt(100)}.jpg", // Foto de perfil aleatoria
          likes: Random().nextInt(2000000), // Likes aleatorios entre 0 y 199
          liked: Random().nextBool(), // Like aleatorio (true o false)
          comments:
              Random().nextInt(2000000), // Comentarios aleatorios entre 0 y 49
          commented: Random().nextBool(), // Comentario aleatorio (true o false)
          shares: Random().nextInt(2000000), // Shares aleatorios entre 0 y 29
          shared: Random().nextBool(), // Share aleatorio (true o false)
        );
      }),
      'Cerca de mí': List.generate(20, (index) {
        return _createPost(
          id: index + 20, // ID consecutivo a partir de 1
          username: "@usuario${index + 20}", // Usuario único
          timeAgo: "Hace ${Random().nextInt(120)} minutos", // Tiempo aleatorio
          content: "Contenido del post ${index + 20}", // Contenido único
          imageUrls: [
            "https://picsum.photos/600/400?random=$index",
            "https://picsum.photos/601/401?random=$index"
          ], // Imagen única
          profileImageUrl:
              "https://randomuser.me/api/portraits/men/${Random().nextInt(100)}.jpg", // Foto de perfil aleatoria
          likes: Random().nextInt(2000000), // Likes aleatorios entre 0 y 199
          liked: Random().nextBool(), // Like aleatorio (true o false)
          comments:
              Random().nextInt(2000000), // Comentarios aleatorios entre 0 y 49
          commented: Random().nextBool(), // Comentario aleatorio (true o false)
          shares: Random().nextInt(2000000), // Shares aleatorios entre 0 y 29
          shared: Random().nextBool(), // Share aleatorio (true o false)
        );
      }),
      'Algo lejos': List.generate(20, (index) {
        return _createPost(
          id: index + 40, // ID consecutivo a partir de 1
          username: "@usuario${index + 40}", // Usuario único
          timeAgo: "Hace ${Random().nextInt(120)} minutos", // Tiempo aleatorio
          content: "Contenido del post ${index + 40}", // Contenido único
          imageUrls: [
            "https://picsum.photos/600/400?random=$index"
          ], // Imagen única
          profileImageUrl:
              "https://randomuser.me/api/portraits/men/${Random().nextInt(100)}.jpg", // Foto de perfil aleatoria
          likes: Random().nextInt(2000000), // Likes aleatorios entre 0 y 199
          liked: Random().nextBool(), // Like aleatorio (true o false)
          comments:
              Random().nextInt(2000000), // Comentarios aleatorios entre 0 y 49
          commented: Random().nextBool(), // Comentario aleatorio (true o false)
          shares: Random().nextInt(2000000), // Shares aleatorios entre 0 y 29
          shared: Random().nextBool(), // Share aleatorio (true o false)
        );
      }),
      'Seguidos': List.generate(20, (index) {
        return _createPost(
          id: index + 60, // ID consecutivo a partir de 1
          username: "@usuario${index + 60}", // Usuario único
          timeAgo: "Hace ${Random().nextInt(120)} minutos", // Tiempo aleatorio
          content: "Contenido del post ${index + 60}", // Contenido único
          imageUrls: [
            "https://picsum.photos/600/400?random=$index",
            "https://picsum.photos/601/401?random=$index"
          ], // Imagen única
          profileImageUrl:
              "https://randomuser.me/api/portraits/men/${Random().nextInt(100)}.jpg", // Foto de perfil aleatoria
          likes: Random().nextInt(2000000), // Likes aleatorios entre 0 y 199
          liked: Random().nextBool(), // Like aleatorio (true o false)
          comments:
              Random().nextInt(2000000), // Comentarios aleatorios entre 0 y 49
          commented: Random().nextBool(), // Comentario aleatorio (true o false)
          shares: Random().nextInt(2000000), // Shares aleatorios entre 0 y 29
          shared: Random().nextBool(), // Share aleatorio (true o false)
        );
      })
    };

    return postsByLocation[location] ?? [];
  }

  // Cargar posts para una ubicación específica
  void _loadPosts(String location) async {
    setState(() {
      _isLoading = true;
    });

    final posts = await _fetchPosts(location);

    setState(() {
      _currentPosts = posts;
      _isLoading = false;
    });
  }

  Map<String, dynamic> _createPost(
      {required int id,
      required String username,
      required String timeAgo,
      required String content,
      required List<String> imageUrls,
      required String profileImageUrl,
      required int likes,
      required bool liked,
      required int comments,
      required bool commented,
      required int shares,
      required bool shared}) {
    return {
      "postId": id,
      "username": username,
      "timeAgo": timeAgo,
      "content": content,
      "imageUrls": imageUrls,
      "profileImageUrl": profileImageUrl,
      "likes": likes,
      "hasLiked": liked,
      "comments": comments,
      "hasCommented": commented,
      "shares": shares,
      "hasShared": shared,
    };
  }

  void _selectLocation(String location) {
    setState(() {
      _selectedButton = 'Cerca de mí';
      _selectedLocation = location;
      _selectedLocationIcon = _locationIcons[location]!;
      _isLocationButtonActive = true;
    });
    _loadPosts(location); // Cargar posts para la nueva ubicación
  }

  void _selectTopButton(String button) {
    print("seleccionaste " + button);

    setState(() {
      _selectedButton = button;
      _isLocationButtonActive = false;
    });

    _loadPosts(button);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Colors.grey[900],
        toolbarHeight: 40,
        centerTitle: true,
        title: Row(
          children: [
            _buildButtonContainer(_buildLocationButton()),
            _buildButtonContainer(
                _buildTopButton('Explorar', Icons.travel_explore_rounded)),
            _buildButtonContainer(_buildTopButton('Seguidos', Icons.groups)),
          ],
        ),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : _currentPosts.isNotEmpty
              ? ListView.builder(
                  itemCount: _currentPosts.length,
                  itemBuilder: (context, index) {
                    final post = _currentPosts[index];
                    return PostWidget(
                      postId: post["postId"],
                      username: post["username"],
                      timeAgo: post["timeAgo"],
                      content: post["content"],
                      imageUrls: post["imageUrls"],
                      profileImageUrl: post["profileImageUrl"],
                      initialLikes: post["likes"],
                      initialComments: post["comments"],
                      initialShares: post["shares"],
                      initialHasLiked: post["hasLiked"],
                      initialHasCommented: post["hasCommented"],
                      initialHasShared: post["hasShared"],
                    );
                  },
                )
              : Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.airplane_ticket_outlined, // Icono de información
                        size: 100,
                        color: Colors.grey[500],
                      ),
                      SizedBox(height: 5), // Espacio entre el icono y el texto
                      Text(
                        "Uppss!",
                        style: TextStyle(
                          fontSize: 24, // Tamaño del texto
                          color: Colors.grey[500], // Color del texto
                          fontWeight: FontWeight.w900, // Grosor del texto
                        ),
                      ),
                      SizedBox(height: 5),
                      Text(
                        "Te recomendamos explora otros lugares",
                        style: TextStyle(
                          fontSize: 18, // Tamaño del texto
                          color: Colors.grey[500], // Color del texto
                          fontWeight: FontWeight.w700, // Grosor del texto
                        ),
                      ),
                      Text(
                        "(Por lo menos por ahora aun no hay nada por aquí)",
                        style: TextStyle(
                          fontSize: 14, // Tamaño del texto
                          color: Colors.grey[500], // Color del texto
                          fontWeight: FontWeight.w500, // Grosor del texto
                        ),
                      ),
                    ],
                  ),
                ),
    );
  }

  Widget _buildButtonContainer(Widget child) {
    return Expanded(
      child: Container(
        alignment: Alignment.center,
        child: child,
      ),
    );
  }

  Widget _buildLocationButton() {
    return PopupMenuButton<String>(
      onSelected: _selectLocation,
      iconSize: 18,
      padding: EdgeInsets.all(0),
      icon: Row(
        children: [
          Icon(_selectedLocationIcon,
              color: _isLocationButtonActive ? Colors.amber : Colors.white70,
              size: 16),
          SizedBox(width: 2),
          Text(_selectedLocation,
              style: TextStyle(
                  color:
                      _isLocationButtonActive ? Colors.amber : Colors.white70,
                  fontSize: 14,
                  fontWeight: FontWeight.bold)),
          Icon(Icons.arrow_drop_down,
              color: _isLocationButtonActive ? Colors.amber : Colors.white70,
              size: 18),
        ],
      ),
      color: Colors.grey[800],
      itemBuilder: (context) => _locationIcons.keys
          .map((location) => PopupMenuItem<String>(
                value: location,
                child: Row(
                  children: [
                    Icon(_locationIcons[location],
                        color: _selectedLocation == location
                            ? Colors.amber
                            : Colors.white70,
                        size: 16),
                    SizedBox(width: 8),
                    Text(location,
                        style: TextStyle(
                            color: _selectedLocation == location
                                ? Colors.amber
                                : Colors.white70)),
                  ],
                ),
              ))
          .toList(),
    );
  }

  Widget _buildTopButton(String text, IconData icon) {
    bool isSelected = _selectedButton == text;

    return GestureDetector(
      onTap: () {
        _selectTopButton(text);
      },
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon,
              color: isSelected ? Colors.amber : Colors.white70, size: 16),
          SizedBox(width: 3),
          Text(text,
              style: TextStyle(
                  color: isSelected ? Colors.amber : Colors.white70,
                  fontSize: 14,
                  fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
