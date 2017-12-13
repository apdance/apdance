<?php
/**
 * Created by PhpStorm.
 * User: MAXX-DEV-PC
 * Date: 13/12/2017
 * Time: 17:36
 * @property CI_Form_validation form_validation
 *
 * Essa class extends de MY_Session que encontra-se na pasta core
 * a qual extends de REST_Controller
 */

class UserRegistration extends MY_Session
{
    private $expected_fields;

    private $fields;

    public function __construct($config = 'rest')
    {
        parent::__construct($config);

        //campos já tratados
        $this->fields = array();

        //campos esperados no post. Qualquer coisa fora disso deve ser ignorado
        $this->expected_fields = array(
            'profile_id',
            'nome_completo',
            'email',
            'data_nascimento',
            'numero_celular',
            'senha', //validação de repetição de senha apenas no frontend
        );
    }



    /**
     * Esta função irá processar a primeira tela.
     * =============
     * O aplicativo possui a tela principal de registro. Após preenchê-la uma nova tela é exibida.
     * Um token deve ser retornado para que as alterações no cadastro na proxima tela sejam salvos para o usuário correto.
     * NNossa api é statelass, logo cada requisição deve ser unica e isolada, por isso a importancia do token;
    */
    public function register_step1_post(){
        $post_fields = $this->post();
        //Ignorar qualquer coisa diferente do array de campos esperados
        foreach ($this->expected_fields as $expected_field) {
            if(isset($post_fields[$expected_field])){
                $this->fields[$expected_field] = $post_fields[$expected_field];
            }
        }
        //->
        $this->load->library('form_validation');
        //set data
        $this->form_validation->set_data($this->fields);

        $array_roles = array(
            array(
                'field'=>'profile_id',
                'name'=>'Perfil',
                'rules'=>'required|numeric',
                'errors'=>array(
                    'required'=>'Preencha corretamente o campo %.',
                    'numeric'=>'O campo % está em um formato incorreto.'
                )
            ),
            array(
                'field'=>'nome_completo',
                'name'=>'Nome Completo',
                'rules'=>'required',
                'errors'=>array(
                    'required'=>'Preencha corretamente o campo %.',
                )
            ),
            array(
                'field'=>'email',
                'name'=>'E-mail',
                'rules'=>'required|email',
                'errors'=>array(
                    'required'=>'Preencha corretamente o campo %.',
                    'email'=>'O campo % não é um email válido.',
                )
            ),
            array(
                'field'=>'data_nascimento',
                'name'=>'Data de Nascimento',
                'rules'=>'required',
                'errors'=>array(
                    'required'=>'Preencha corretamente o campo %.',
                )
            ),
            array(
                'field'=>'numero_celular',
                'name'=>'Número de celular',
                'rules'=>'required',
                'errors'=>array(
                    'required'=>'Preencha corretamente o campo %.',
                )
            )
        );

        //processar

        if($this->form_validation->run() == FALSE){
            $this->response(array(
                'success'=>false,
                'meg'=>'Alguns campos não foram preenchidos corretamente.',
                'errors'=>$this->form_validation->error_array()
            ));
        }

        //processar no banco
        //......


        //-------Exibir resultado
        $this->response(array(
            'success'=>false,
            'meg'=>'',
            'errors'=>array(),
            'token'=>'sb7cb34hn394nc932n-v4239n4-89328932849' //implementar função para gerar token
        ));
    }


    public function register_step2_post(){
        //requer  token gerado no passo anterior
        //...
    }
}