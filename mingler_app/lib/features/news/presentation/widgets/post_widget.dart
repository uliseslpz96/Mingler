import 'package:flutter/material.dart';

class PostWidget extends StatefulWidget {
  final int postId;
  final String username;
  final String timeAgo;
  final String content;
  final List<String>? imageUrls;
  final String profileImageUrl;
  final int initialLikes;
  final int initialComments;
  final int initialShares;
  final bool initialHasLiked;
  final bool initialHasCommented;
  final bool initialHasShared;

  const PostWidget({
    Key? key,
    required this.postId,
    required this.username,
    required this.timeAgo,
    required this.content,
    this.imageUrls,
    required this.profileImageUrl,
    required this.initialLikes,
    required this.initialComments,
    required this.initialShares,
    required this.initialHasLiked,
    required this.initialHasCommented,
    required this.initialHasShared,
  }) : super(key: key);

  @override
  _PostWidgetState createState() => _PostWidgetState();
}

class _PostWidgetState extends State<PostWidget> {
  late int _likes;
  late int _shares;
  late bool _hasLiked;
  late bool _hasCommented;
  late bool _hasShared;

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

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 6, horizontal: 12),
      padding: EdgeInsets.all(12),
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
                  errorBuilder: (context, error, stackTrace) => CircleAvatar(
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
                  Text(
                    widget.username,
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                  ),
                  Text(
                    widget.timeAgo,
                    style: TextStyle(fontSize: 12, color: Colors.grey),
                  ),
                ],
              ),
            ],
          ),

          SizedBox(height: 8),

          /// 🔹 Contenido del post
          Text(
            widget.content,
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(color: Colors.black, fontSize: 14),
          ),

          SizedBox(height: 8),

          /// 🔹 Carrusel de imágenes (si tiene)
          if (widget.imageUrls != null && widget.imageUrls!.isNotEmpty)
            ClipRRect(
              borderRadius: BorderRadius.circular(5),
              child: AspectRatio(
                aspectRatio: 1 / 1,
                child: PageView(
                  children: widget.imageUrls!
                      .map((imageUrl) => Image.network(
                            imageUrl,
                            fit: BoxFit.cover,
                            width: double.infinity,
                          ))
                      .toList(),
                ),
              ),
            ),

          SizedBox(height: 8),

          /// 🔹 Botones de interacción alineados a la izquierda
          Row(
            children: [
              _buildActionButton(
                _hasLiked ? Icons.favorite : Icons.favorite_border,
                formatNumber(_likes),
                _hasLiked,
                _handleLike,
                activeColor: Colors.red,
              ),
              SizedBox(width: 10),
              _buildActionButton(
                widget.initialHasCommented
                    ? Icons.question_answer_rounded
                    : Icons.question_answer_outlined,
                formatNumber(widget.initialComments),
                _hasCommented, // widget.initialHasCommented,
                _handleComment,
                activeColor: Colors.blue,
              ),
              SizedBox(width: 10),
              _buildActionButton(
                _hasShared ? Icons.share : Icons.share_outlined,
                formatNumber(_shares),
                _hasShared,
                _handleShare,
                activeColor: Colors.green,
              ),
            ],
          ),
        ],
      ),
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
                color: Colors.grey[300], // Fondo gris claro cuando está activo
                borderRadius: BorderRadius.circular(20), // Forma ovalada
              )
            : BoxDecoration(
                color: Colors.transparent, // Sin fondo cuando no está activo
                borderRadius: BorderRadius.circular(20),
              ),
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
                size: 22,
                color: isActive ? activeColor : Colors.grey[600],
              ),
            ),
            SizedBox(width: 5),
            AnimatedDefaultTextStyle(
              duration: Duration(
                  milliseconds: 300), // Duración de la animación del texto
              curve: Curves.easeInOut,
              style: TextStyle(
                fontSize: 14,
                color: isActive ? activeColor : Colors.grey[700],
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
