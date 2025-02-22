import 'package:flutter/material.dart';

class PostWidget extends StatefulWidget {
  final int postId;
  final String username;
  final bool isFriend;
  final bool isBirthday;
  final String timeAgo;
  final String location;
  final bool isExploring;
  final String content;
  final List<String>? imageUrls;
  final String profileImageUrl;
  final int initialLikes;
  final int initialComments;
  final int initialShares;
  final bool initialHasLiked;
  final bool initialHasCommented;
  final bool initialHasShared;
  final int views;

  const PostWidget(
      {Key? key,
      required this.postId,
      required this.username,
      required this.isFriend,
      required this.isBirthday,
      required this.timeAgo,
      required this.location,
      required this.isExploring,
      required this.content,
      this.imageUrls,
      required this.profileImageUrl,
      required this.initialLikes,
      required this.initialComments,
      required this.initialShares,
      required this.initialHasLiked,
      required this.initialHasCommented,
      required this.initialHasShared,
      required this.views})
      : super(key: key);

  @override
  _PostWidgetState createState() => _PostWidgetState();
}

class _PostWidgetState extends State<PostWidget> {
  late int _likes;
  late int _shares;
  late bool _hasLiked;
  late bool _hasCommented;
  late bool _hasShared;

  bool _isExpanded = false;
  // 🔹 Agregar controlador para detectar la imagen actual
  PageController _pageController = PageController();
  int _currentPage = 0;

  @override
  void initState() {
    super.initState();
    _likes = widget.initialLikes;
    _shares = widget.initialShares;
    _hasLiked = widget.initialHasLiked;
    _hasCommented = widget.initialHasCommented;
    // _hasCommented = false;
    _hasShared = widget.initialHasShared;
  }

  void _handleLike() {
    setState(() {
      _hasLiked = !_hasLiked;
      _likes += _hasLiked ? 1 : -1;
    });
  }

  void _handleShare() {
    setState(() {
      _hasShared = !_hasShared;
      _shares += _hasShared ? 1 : -1;
    });
  }

  void _handleComment() {
    setState(() {
      _hasCommented = !_hasCommented;
    });
    print("Haz seleccionado comentarios");

    // Abre el modal
    _showCommentModal();
  }

  void _showCommentModal() {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          padding: EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Text(
                "Comentarios",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 16),
              TextField(
                decoration: InputDecoration(
                  hintText: "Escribe tu comentario...",
                  border: OutlineInputBorder(),
                ),
                maxLines: 3,
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  // Aquí puedes agregar la lógica para guardar el comentario
                  Navigator.pop(context); // Cierra el modal
                },
                child: Text("Enviar comentario"),
              ),
            ],
          ),
        );
      },
    );
  }

  String formatNumber(int value) {
    if (value >= 1000000) {
      // Si es un millón o más, divide entre 1M y formatea con "M"
      double parsed = value / 1000000;
      return '${parsed.toStringAsFixed(1)} M';
    } else if (value >= 1000) {
      // Si es mayor o igual a 1000, divide entre 1K y formatea con "K"
      double parsed = value / 1000;
      return '${parsed.toStringAsFixed(1)} K';
    } else {
      // Si es menor a 1000, simplemente convierte a string
      return value.toString();
    }
  }

  void _openImageFullScreen(BuildContext context) {
    showDialog(
      context: context,
      barrierColor: Colors.black87, // 🔥 Fondo oscuro para enfoque en la imagen
      builder: (context) {
        return Dialog(
          backgroundColor: Colors.transparent, // Fondo transparente
          insetPadding: EdgeInsets.zero, // 🔥 Ocupa toda la pantalla
          child: Stack(
            children: [
              // 🔹 Imagen en pantalla completa con PageView y zoom
              SizedBox(
                width: double.infinity,
                height: MediaQuery.of(context).size.height,
                child: PageView.builder(
                  controller: PageController(
                      initialPage:
                          _currentPage), // 🔥 Inicia en la imagen seleccionada
                  itemCount: widget.imageUrls!.length,
                  onPageChanged: (index) {
                    setState(() {
                      _currentPage =
                          index; // 🔥 Mantiene sincronización con el carrusel principal
                    });
                  },
                  itemBuilder: (context, index) {
                    return Center(
                      // 🔥 Centrar la imagen para mejor vista
                      child: InteractiveViewer(
                        minScale: 1.0, // 🔹 Escala mínima (original)
                        maxScale: 3.0, // 🔹 Se puede ampliar hasta 3x
                        child: Image.network(
                          widget.imageUrls![index],
                          fit: BoxFit
                              .contain, // 🔥 Ocupará el ancho o alto sin recortarse
                          width: double.infinity,
                          height: double.infinity,
                        ),
                      ),
                    );
                  },
                ),
              ),

              // 🔹 Botón de cerrar en la esquina superior derecha 🔥
              Positioned(
                top: 3, // 🔥 Más pegado a la parte superior
                right: 3, // 🔥 Pegado completamente a la derecha
                child: GestureDetector(
                  onTap: () => Navigator.pop(context), // 🔥 Cierra el diálogo
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.black54,
                      shape: BoxShape.circle,
                    ),
                    padding: EdgeInsets.all(
                        12), // 🔥 Un poco más de padding para mejorar el área táctil
                    child: Icon(
                      Icons.close,
                      color: Colors.white,
                      size: 30,
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // 🔹 Contenedor principal del post
        Container(
          margin: EdgeInsets.symmetric(vertical: 4, horizontal: 7),
          padding: EdgeInsets.all(9),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(5),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 4,
                spreadRadius: 1,
                offset: Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// 🔹 Encabezado con foto de perfil y nombre
              Row(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(50),
                    child: Image.network(
                      widget.profileImageUrl,
                      width: 40,
                      height: 40,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) =>
                          CircleAvatar(
                        radius: 20,
                        backgroundColor: Colors.grey[300],
                        child: Icon(Icons.person, color: Colors.grey[700]),
                      ),
                    ),
                  ),
                  SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            widget.username,
                            style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 14,
                                color: Colors.black87),
                          ),
                          SizedBox(width: 5),
                          if (widget.isFriend)
                            Icon(
                              Icons.group_rounded,
                              color: Colors.blueGrey,
                              size: 16,
                            ),
                          if (widget.isBirthday) SizedBox(width: 5),
                          // Icono de cumpleaños con fondo circular gris claro
                          if (widget.isBirthday)
                            Container(
                              padding: EdgeInsets.all(
                                  3), // Espaciado interno para hacer más grande el fondo
                              decoration: BoxDecoration(
                                color: Colors.grey.shade200, // Fondo gris claro
                                shape: BoxShape
                                    .circle, // Hace que el fondo sea circular
                              ),
                              child: Icon(
                                Icons.cake_rounded,
                                color: Colors.pinkAccent.shade100,
                                size: 16,
                              ),
                            ),
                        ],
                      ),
                      Row(
                        children: [
                          Text(
                            widget.timeAgo,
                            style: TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                          SizedBox(width: 5),
                          Text("•",
                              style:
                                  TextStyle(fontSize: 14, color: Colors.grey)),
                          SizedBox(width: 5),
                          Text(
                            widget.location,
                            style: TextStyle(
                                fontSize: 12,
                                fontWeight: widget.isExploring
                                    ? FontWeight.bold
                                    : FontWeight.normal,
                                color: widget.isExploring
                                    ? Colors.orange
                                    : Colors.grey),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),

              SizedBox(height: 8),

              /// 🔹 Contenido del post
              GestureDetector(
                onDoubleTap: _handleLike,
                child: Text(
                  widget.content,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                      color: Colors.black87,
                      fontSize: widget.imageUrls != null &&
                              widget.imageUrls!.isNotEmpty
                          ? 14
                          : 20),
                ),
              ),

              SizedBox(height: 8),

              /// 🔹 Carrusel de imágenes
              if (widget.imageUrls != null && widget.imageUrls!.isNotEmpty)
                Stack(
                  children: [
                    GestureDetector(
                      onTap: () => _openImageFullScreen(context),
                      onDoubleTap: _handleLike,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(5),
                        child: AspectRatio(
                          aspectRatio: 1 / 1,
                          child: PageView(
                            controller: _pageController,
                            onPageChanged: (index) {
                              setState(() {
                                _currentPage = index;
                              });
                            },
                            children: widget.imageUrls!
                                .map(
                                  (imageUrl) => Image.network(
                                    imageUrl,
                                    fit: _isExpanded
                                        ? BoxFit.contain
                                        : BoxFit.cover,
                                    width: double.infinity,
                                  ),
                                )
                                .toList(),
                          ),
                        ),
                      ),
                    ),
                    // 🔹 Indicador de imágenes
                    if (widget.imageUrls!.length > 1)
                      Positioned(
                        bottom: 8,
                        left: 8,
                        child: Container(
                          padding:
                              EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.black54,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            "${_currentPage + 1}/${widget.imageUrls!.length}",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 12,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),

                    // 🔹 Botón para expandir/contraer
                    Positioned(
                      bottom: 8,
                      right: 8,
                      child: GestureDetector(
                        onTap: () {
                          setState(() {
                            _isExpanded = !_isExpanded;
                          });
                        },
                        child: Container(
                          decoration: BoxDecoration(
                            color: Colors.black54,
                            shape: BoxShape.circle,
                          ),
                          padding: EdgeInsets.all(8),
                          child: Icon(
                            _isExpanded
                                ? Icons.fullscreen
                                : Icons.fullscreen_exit,
                            color: Colors.white,
                            size: 22,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),

              SizedBox(height: 8),

              /// 🔹 Botones de interacción + Indicador de vistas
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      _buildActionButton(
                        _hasLiked ? Icons.favorite : Icons.favorite_border,
                        formatNumber(_likes),
                        _hasLiked,
                        _handleLike,
                        activeColor: Colors.red,
                      ),
                      SizedBox(width: 5),
                      _buildActionButton(
                        widget.initialHasCommented
                            ? Icons.question_answer_rounded
                            : Icons.question_answer_outlined,
                        formatNumber(widget.initialComments),
                        _hasCommented,
                        _handleComment,
                        activeColor: Colors.blue,
                      ),
                      SizedBox(width: 5),
                      _buildActionButton(
                        _hasShared ? Icons.share : Icons.share_outlined,
                        formatNumber(_shares),
                        _hasShared,
                        _handleShare,
                        activeColor: Colors.green,
                      ),
                    ],
                  ),
                  Container(
                    padding: EdgeInsets.symmetric(
                        horizontal: 4, vertical: 2), // Espaciado interno
                    decoration: BoxDecoration(
                      color: Colors.grey.shade200, // Fondo gris claro
                      borderRadius:
                          BorderRadius.circular(12), // Bordes redondeados
                    ),
                    child: Row(
                      mainAxisSize:
                          MainAxisSize.min, // Ajusta el tamaño al contenido
                      children: [
                        Icon(
                          Icons.remove_red_eye, // Icono del ojo
                          color: Colors.grey.shade600, // Color tenue
                          size: 14,
                        ),
                        SizedBox(width: 3), // Espaciado entre icono y número
                        Text(
                          formatNumber(widget.views), // Número de vistas
                          style: TextStyle(
                              fontSize: 10, color: Colors.grey.shade900),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),

        // 🔹 Ícono flotante en la esquina superior derecha
        if (widget.isExploring)
          Positioned(
            top: 8,
            right: 12,
            child: Icon(
              Icons.explore_rounded, //mode_of_travel_rounded,
              color: Colors.orange,
              size: 24,
            ),
          ),
      ],
    );
  }

  /// 🔹 Método para construir los botones de interacción
  Widget _buildActionButton(
      IconData icon, String count, bool isActive, VoidCallback onPressed,
      {Color activeColor = Colors.blue}) {
    return GestureDetector(
      onTap: onPressed,
      child: AnimatedContainer(
        duration: Duration(milliseconds: 300), // Duración de la animación
        curve: Curves.easeInOut, // Suaviza la animación
        padding: EdgeInsets.symmetric(
            horizontal: 10, vertical: 6), // Espaciado interno
        decoration: isActive
            ? BoxDecoration(
                color:
                    Colors.grey.shade300, // Fondo gris claro cuando está activo
                borderRadius: BorderRadius.circular(20), // Forma ovalada
                border: Border.all(
                  color: Colors.grey.shade300,
                  width: 1,
                ))
            : BoxDecoration(
                color: Colors.grey.shade100, // Sin fondo cuando no está activo
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.grey.shade300, width: 1)),
        child: Row(
          mainAxisSize: MainAxisSize.min, // Ajusta el tamaño al contenido
          children: [
            AnimatedSwitcher(
              duration:
                  Duration(milliseconds: 300), // Duración del cambio de icono
              transitionBuilder: (child, animation) {
                return ScaleTransition(scale: animation, child: child);
              },
              child: Icon(
                icon,
                key: ValueKey(
                    isActive), // Asegura que la animación ocurra solo en cambios
                size: 20,
                color: isActive ? activeColor : Colors.grey.shade600,
              ),
            ),
            SizedBox(width: 5),
            AnimatedDefaultTextStyle(
              duration: Duration(
                  milliseconds: 300), // Duración de la animación del texto
              curve: Curves.easeInOut,
              style: TextStyle(
                fontSize: 12,
                color: isActive ? activeColor : Colors.grey.shade700,
                fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
              ),
              child: Text(count),
            ),
          ],
        ),
      ),
    );
  }
}
