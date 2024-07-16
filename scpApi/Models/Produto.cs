namespace scpApi.Models {
    public class Produto{
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string NomeFabricante { get; set; } = string.Empty;
        public int Peso { get; set; }
        public decimal Preco { get; set; }
        public string Categoria { get; set; } = string.Empty;
        public string Fornecedor { get; set; } = string.Empty;
        public string Estoque { get; set; } = string.Empty;
    }
}