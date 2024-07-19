namespace SistemaSCP_API.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Descricao { get; set; }
        public string? Marca { get; set; }
        public string? Fabricante { get; set; }
        public int Peso { get; set; }
        public decimal Preco { get; set; }
        public string? Categoria { get; set; }
        public string? Fornecedor { get; set; }
    }
}
