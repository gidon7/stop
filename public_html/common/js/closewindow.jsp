<script type="text/javascript">
    var id = parent.GlobalLayers.length > 0 ? parent.GlobalLayers.pop() : "";
    parent.TopLayer = parent.GlobalLayers.length > 0 ? parent.GlobalLayers[parent.GlobalLayers.length - 1] : "";
    if(parent.gi("dim-layer" + id)) parent.gi("dim-layer" + id).parentNode.removeChild(parent.gi("dim-layer" + id));
    if(parent.gi("wrap-layer" + id)) parent.gi("wrap-layer" + id).parentNode.removeChild(parent.gi("wrap-layer" + id));
</script>